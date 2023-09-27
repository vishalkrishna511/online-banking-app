package com.onlinebanking.serverside.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;

import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.exceptions.AccountAlreadyExistsException;
import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.exceptions.TransactionsNotFoundException;
import com.onlinebanking.serverside.model.AccountStatement;
import com.onlinebanking.serverside.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.model.Customer;

@Service
public class AccountService {
	@Autowired
	AccRepository accRepository;

	@Autowired
	CustomerService customerService;

	@Autowired
	TransactionRepository transactionRepository;

//	@Autowired
//	TransactionService transactionService;

	private static final Long counter = 100000000000L;

	public Account save(Account account, Long userId) throws CustomerNotFoundException, AccountAlreadyExistsException {

		Account response = accRepository.findByAccNo(account.getAccNo());
		Customer customer = customerService.getCustomerDetails(userId);

		if (response == null) {
			String ifsc = generateIFSC(customer.getCity(), customer.getState());
			account.setIfsc(ifsc);
			account.setBranch(customer.getCity());
			account.setAccNo(generateAccountNumber());
			account.setUser(customer);
			account.setDisabled(false);
			account.setOpeningDate(getCurrentDate());
			response = accRepository.save(account);
			if(account.getBalance()>0) {
				Transaction transaction = new Transaction();
				transaction.setAccNo(account);
				transaction.setAmt(account.getBalance());
				transaction.setDebitAccnt(0L);
				transaction.setCreditAccnt(account.getAccNo());
				transaction.setTimeStamp(getCurrentDateTimeStamp());
				transaction.setStatus("SUCCESS");
				transaction.setTxnType("Opening Deposit");
				transactionRepository.save(transaction);
			}


//			Transaction transaction = new Transaction();
//			transaction.setAccNo(account);
//			transaction.setAmt(account.getBalance());
//			transaction.setDebitAccnt(account.getAccNo());
//			transaction.setTimeStamp(getCurrentDateTimeStamp());
//			transaction.setStatus("SUCCESS");
//			transaction.setDebitAccnt(0L);
//			transaction.setTxnType("Opening Deposit");
			
			return response; 
			
		}

		throw new AccountAlreadyExistsException("Account already exists with the given account number");

	}

	private Long generateAccountNumber() {
		UUID uuid = UUID.randomUUID();
		String uuidString = uuid.toString();
		int hashCode = Math.abs(uuidString.hashCode());
		long uniqueNum = (long) hashCode;
		uniqueNum = uniqueNum + counter;
		return uniqueNum;
	}

	private String getCurrentDate() {
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		return currentDate.format(formatter);
	}

	private static String getCurrentDateTimeStamp() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS");
		return now.format(formatter);
	}

	private static String generateIFSC(String city, String state) {
		if (city.length() < 4) {
			city = city + "0000";
		}
		if (state.length() < 2) {
			state = state + "ZZ";
		}
		String cityCode = city.substring(0, 4).toUpperCase();
		String stateCode = state.substring(0, 2).toUpperCase();
		String partialCode = city.substring(0, 3).toUpperCase() + state.substring(0, 2).toUpperCase();
		StringBuilder asciiCode = new StringBuilder();
		for (char c : partialCode.toCharArray()) {
			asciiCode.append((int) c % 10);
		}
		String ifscCode = cityCode + asciiCode.toString() + stateCode;
		return ifscCode;
	}

	public List<Account> viewAccount(long userId) throws CustomerNotFoundException {
		Customer customer = customerService.getCustomer(userId);
		if (customer == null) {
			throw new CustomerNotFoundException("No customer exists with the given userId");
		}
		List<Account> accounts = accRepository.findByUser(customer);
		if (accounts.isEmpty()) {
			throw new AccountNotFoundException("No Accounts created!");
		}
		return accounts;
	}

	public Account getAccountDetails(long accNo) throws AccountNotFoundException {

		Account account = null;
		account = accRepository.findByAccNo(accNo);

		if (account == null) {
			throw new AccountNotFoundException("No Account Found With Account No :  " + accNo);
		}
		return account;
	}

	public double getAccountBalance(long accNo) throws AccountNotFoundException {

		return getAccountDetails(accNo).getBalance();
	}

	public List<Transaction> getAccountStatement(long accNo, AccountStatement accountStatement)
			throws TransactionsNotFoundException {
		List<Transaction> transactions = new ArrayList<>();
		String fromDate = accountStatement.getFromDate();
		String toDate = accountStatement.getToDate();
		List<Transaction> successTransactions = transactionRepository.findAllByAccNoWhereStatusIsSuccess(accNo,
				"SUCCESS");
		DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS");
		LocalDateTime startDate, endDate;
		startDate = LocalDateTime.parse(fromDate, dateFormat);
		endDate = LocalDateTime.parse(toDate, dateFormat);
		IntStream.range(0, successTransactions.size()).forEach((idx) -> {
			LocalDateTime timeOfTransaction = LocalDateTime.parse(successTransactions.get(idx).getTimeStamp(),
					dateFormat);
			if (startDate.isBefore(timeOfTransaction) && endDate.isAfter(timeOfTransaction)) {
				transactions.add(successTransactions.get(idx));
			}
		});

		if (transactions.isEmpty()) {
			throw new TransactionsNotFoundException("No transactions made for the given time period!");
		}
		return transactions;
	}
}
