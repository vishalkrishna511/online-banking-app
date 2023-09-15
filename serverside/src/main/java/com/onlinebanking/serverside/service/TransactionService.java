package com.onlinebanking.serverside.service;

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

@Service
public class TransactionService {
	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	AccountService accountService;

	@Autowired
	AccRepository accRepository;

	public Transaction transact(Transaction transaction) {
		Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
		if (account == null || accRepository.findByAccNo(transaction.getCreditAccnt()) == null){
			return null;
		}
		double transactionAmt = transaction.getAmt();
		boolean isCreditAccntDisabled = accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled();
		boolean isDebitAccntFD = accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD");
		boolean isCreditAccntFD = accRepository.findByAccNo(transaction.getCreditAccnt()).getAccType().equals("FD");
		double balance = account.getBalance();
		if(transactionAmt > balance || account.isDisabled() || isCreditAccntDisabled  || isDebitAccntFD|| isCreditAccntFD){
			transaction.setStatus("FAIL");
		}
		else{
			Account accCredited = accRepository.findByAccNo(transaction.getCreditAccnt());
			transaction.setStatus("SUCCESS");
			balance -= transactionAmt;
			if(transaction.getDebitAccnt() != transaction.getCreditAccnt()){
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
		System.out.println("iugb" + transaction);
		return transactionRepository.save(transaction);
	}

	public List<Transaction> getTransactions(long debitAccnt) {
        return transactionRepository.findAllByDebitAccnt(debitAccnt);
	}

	private static String getCurrentDateTimeStamp() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS");
        return now.format(formatter);
	}

	public Transaction withdrawMoney(Transaction trsn) {
		// TODO Auto-generated method stub
		Account account = accRepository.findByAccNo(trsn.getDebitAccnt());
		if (account == null || account.isDisabled() || account.getBalance() < trsn.getAmt()) {
			return null;

		}
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

	public Transaction depositMoney(Transaction trsn) {
		// TODO Auto-generated method stub
		Account account = accRepository.findByAccNo(trsn.getCreditAccnt());
		if (account == null || account.isDisabled()) {
			return null;

		}
		account.setBalance(account.getBalance() + trsn.getAmt());
		accRepository.save(account);
		trsn.setAccNo(account);
		trsn.setTimeStamp(getCurrentDateTimeStamp());
		trsn.setStatus("Success");
		trsn.setDebitAccnt(0L);
		trsn.setTxnType("Deposit");
		transactionRepository.save(trsn);

		return trsn;
	}
}
