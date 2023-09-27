package com.onlinebanking.serverside.service;

import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.InvalidTransactionException;
import com.onlinebanking.serverside.exceptions.TransactionDeclinedException;
import com.onlinebanking.serverside.exceptions.TransactionsNotFoundException;
import com.onlinebanking.serverside.model.Account;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.model.Transaction;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TransactionService {
	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	AccountService accountService;

	@Autowired
	AccRepository accRepository;

	public Transaction save(Transaction transaction) {
		Transaction response = transactionRepository.findByTxnId(transaction.getTxnId());
		if (response == null) {
			return transactionRepository.save(transaction);
		} else
			return null;
	}

	public Transaction transact(Transaction transaction)
			throws TransactionDeclinedException, AccountNotFoundException {
		Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
		if (account == null) {
			throw new AccountNotFoundException("Debit Account Not Found!");
		}
		if (accRepository.findByAccNo(transaction.getCreditAccnt()) == null){
			throw new AccountNotFoundException("Credit Account Not Found!");
		}
		double transactionAmt = transaction.getAmt();
		boolean isCreditAccntDisabled = accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled();
		boolean isDebitAccntFD = accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD");
		boolean isCreditAccntFD = accRepository.findByAccNo(transaction.getCreditAccnt()).getAccType().equals("FD");
		double balance = account.getBalance();
		if (transactionAmt > balance || account.isDisabled() || isCreditAccntDisabled || isDebitAccntFD
				|| isCreditAccntFD || transaction.getAmt() < 0) {
			transaction.setStatus("FAIL");
			String reason = "";
			if (transactionAmt > balance) reason = "Amount exceeds the available balance!";
			else if (account.isDisabled()) reason = "Your Account is disabled!";
			else if (isCreditAccntDisabled) reason = "Creditor account is disabled!";
			else if (isDebitAccntFD) reason = "Debitor account is a FD account!";
			else if (isCreditAccntFD) reason = "Creditor account is a FD account!";
			else reason = "Amount is less than zero!";
			throw new TransactionDeclinedException("Transaction Failed: " + reason + "!");
		} else {
			Account accCredited = accRepository.findByAccNo(transaction.getCreditAccnt());
			transaction.setStatus("SUCCESS");
			balance -= transactionAmt;
			if (transaction.getDebitAccnt() != transaction.getCreditAccnt()) {
				double accCreditedBalance = accCredited.getBalance();
				accCreditedBalance += transactionAmt;
				accCredited.setBalance(accCreditedBalance);
				accRepository.save(accCredited);
			}
			account.setBalance(balance);
			accRepository.save(account);
		}
		transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccnt()));
		transaction.setTimeStamp(getCurrentDateTimeStamp());
		return transactionRepository.save(transaction);
	}

	public List<Transaction> getTransactions(long Accnt) throws TransactionsNotFoundException {
		
		List<Transaction> debtList = transactionRepository.findAllByDebitAccnt(Accnt);
		List<Transaction> credList = transactionRepository.findAllByCreditAccnt(Accnt);
		debtList.addAll(credList);
//		if (debtList.isEmpty())
//			throw new TransactionsNotFoundException("No transaction record for the provided account!");
		return debtList;
		
	}

	private static String getCurrentDateTimeStamp() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS");
		return now.format(formatter);
	}

	public Transaction withdrawMoney(Transaction trsn)
			throws TransactionDeclinedException, AccountNotFoundException{
		// TODO Auto-generated method stub
		Account account = accRepository.findByAccNo(trsn.getDebitAccnt());
		if (account == null ) throw new AccountNotFoundException("No account exists with the given account number!");
		if (account.isDisabled()) throw new AccountNotFoundException("Account is disabled!");
		if (account.getBalance() < trsn.getAmt()) throw new TransactionDeclinedException("Amount exceeds the balance!");
		if (trsn.getAmt() < 0) throw new TransactionDeclinedException("Amount cannot be less than zero!");
		account.setBalance(account.getBalance() - trsn.getAmt());
		accRepository.save(account);
		trsn.setAccNo(account);
		trsn.setTimeStamp(getCurrentDateTimeStamp());
		trsn.setStatus("Success");
		trsn.setCreditAccnt(0L);
		trsn.setTxnType("withdraw");
		transactionRepository.save(trsn);

		return trsn;
	}

	public Transaction depositMoney(Transaction trsn)
			throws TransactionDeclinedException, AccountNotFoundException{
		Account account = accRepository.findByAccNo(trsn.getCreditAccnt());
		if (account == null ) throw new AccountNotFoundException("No account exists with the given account number!");
		if (account.isDisabled()) throw new AccountNotFoundException("Account is disabled!");
		if (trsn.getAmt() < 0) throw new TransactionDeclinedException("Amount cannot be less than zero!");

		account.setBalance(account.getBalance() + trsn.getAmt());
		accRepository.save(account);
		trsn.setAccNo(account);
		trsn.setTimeStamp(getCurrentDateTimeStamp());
		trsn.setStatus("SUCCESS");
		trsn.setDebitAccnt(0L);
		trsn.setTxnType("Deposit");
		transactionRepository.save(trsn);

		return trsn;
	}

	public boolean deleteTransactionByAccNo(Account account){
		List<Transaction> transactions = transactionRepository.findAllByAccount(account);
		for (Transaction t: transactions){
			transactionRepository.delete(t);
		}
		return true;
	}
}
