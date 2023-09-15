package com.onlinebanking.serverside.service;

import com.onlinebanking.serverside.model.Account;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
	AccRepository accRepository;

	public Transaction save(Transaction transaction) {
		Transaction response = transactionRepository.findByTxnId(transaction.getTxnId());
		if (response == null) {
			return transactionRepository.save(transaction);
		} else
			return null;
	}

	public List<Transaction> getTransactions(long debitAccnt) {
		// TODO Auto-generated method stub
		List<Transaction> transactions = transactionRepository.findAllByDebitAccnt(debitAccnt);
		return transactions;
	}
//	public String cashWithdraw(long accNo) {
//		// TODO Auto-generated method stub
//		
//		Account account = accRepository.findByAccNo(accNo);
//		
//		return null;
//	}
//
//	public Transaction transact(Transaction transaction) {
//		//TODO: modify and run 
//		
////		transaction.setStatus("FAIL");
////		String transactionTime = getCurrentDateTimeStamp();
////		transaction.setTimeStamp(transactionTime);
////		
////		System.out.println("######>>>> "+transaction.getTxnType());
////		if(transaction.getTxnType().matches("deposit")) {
////			System.out.println("######"+transaction.getCreditAccnt());
////			Account accoun = accRepository.findByAccNo(transaction.getCreditAccnt());
////			double transactionAmt = transaction.getAmt();
////			double balance = accoun.getBalance();	
////			transaction.setTxnType("deposit");
////			transaction.setDebitAccnt(000000000000L);
////			transaction.setCreditAccnt(accoun.getAccNo());
////			
////			transaction.setAccNo(accRepository.findByAccNo(transaction.getCreditAccnt()));
////			if(!accoun.isDisabled()) {
////				balance += transactionAmt;
////				accoun.setBalance(balance);
////				accRepository.save(accoun);
////				transaction.setStatus("SUCCESS");
////			}
////			else {
////				transaction.setStatus("FAIL");
////			}
////			return transactionRepository.save(transaction);
////		}
////		else if(transaction.getTxnType().matches("withdraw")) {
////			System.out.println("@@@@@@"+transaction.getCreditAccnt());
////
////			Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
////			double transactionAmt = transaction.getAmt();
////			double balance = account.getBalance();	
////			transaction.setTxnType("withdraw");
////			transaction.setCreditAccnt(000000000000L);
////			transaction.setDebitAccnt(account.getAccNo());
////			transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccnt()));
////			if(!account.isDisabled() && balance >= transactionAmt) {
////				balance -= transactionAmt;
////				account.setBalance(balance);
////				accRepository.save(account);
////				transaction.setStatus("SUCCESS");
////			}
////			else {
////				transaction.setStatus("FAIL");
////			}
////			return transactionRepository.save(transaction);
////		}
////		System.out.println(">>>>>"+transaction.getCreditAccnt());
////
////		Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
////		double transactionAmt = transaction.getAmt();
////		double balance = account.getBalance();	
////		transaction.setTxnType("withdraw");
////		transaction.setCreditAccnt(transaction.getCreditAccnt());
////		transaction.setDebitAccnt(account.getAccNo());
////		transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccnt()));
////		if (transactionAmt > balance || account.isDisabled()
////				|| accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled()
////				|| accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD")
////				|| accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD")
////				|| transaction.getDebitAccnt() == transaction.getCreditAccnt()) {
////			transaction.setStatus("FAIL");
////		} else {
////			Account accCredited = accRepository.findByAccNo(transaction.getCreditAccnt());
////			double accCreditedBalance = accCredited.getBalance();
////			accCreditedBalance += transactionAmt;
////			accCredited.setBalance(accCreditedBalance);
////			accRepository.save(accCredited);
////			account.setBalance(balance);
////			accRepository.save(account);
////			transaction.setStatus("SUCCESS");
////		}
////		
////		transaction.setTimeStamp(transactionTime);
////		return transactionRepository.save(transaction);
////	
//		
//		//#################
//		System.out.println("@#@#@#@# "+transaction.getDebitAccnt());
//		Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
//		System.out.println("@#@#@#@# "+account.getAccNo());
//
//		String transactionTime = getCurrentDateTimeStamp();
//		double transactionAmt = transaction.getAmt();
//		double balance = account.getBalance();		
//
//		if (transaction.getTxnType() == "deposit" && !account.isDisabled()) {
//			balance += transactionAmt;
//			transaction.setTxnType("deposit");
//			transaction.setDebitAccnt(000000000000L);
//			transaction.setCreditAccnt(account.getAccNo());
//			account.setBalance(balance);
//			accRepository.save(account);
//			transaction.setTimeStamp(transactionTime);
//			transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccnt()));
//			return transactionRepository.save(transaction);
//		} else if (transaction.getTxnType() == "withdraw" && balance > transactionAmt && !account.isDisabled()) {
//			balance -= transactionAmt;
//			transaction.setTxnType("withdraw");
//			transaction.setCreditAccnt(000000000000L);
//			transaction.setDebitAccnt(account.getAccNo());
//			account.setBalance(balance);
//			accRepository.save(account);
//			transaction.setStatus("SUCCESS");
//			transaction.setTimeStamp(transactionTime);
//			transaction.setAccNo(accRepository.findByAccNo(transaction.getCreditAccnt()));
//			return transactionRepository.save(transaction);
//		}
//		else if (transactionAmt > balance || account.isDisabled()
//				|| accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled()
//				|| accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD")
//				|| accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD")
//				|| transaction.getDebitAccnt() == transaction.getCreditAccnt()) {
//			transaction.setStatus("FAIL");
////			return transaction;
//		} else {
//			Account accCredited = accRepository.findByAccNo(transaction.getCreditAccnt());
//			double accCreditedBalance = accCredited.getBalance();
//			accCreditedBalance += transactionAmt;
//			accCredited.setBalance(accCreditedBalance);
//			accRepository.save(accCredited);
//			account.setBalance(balance);
//			accRepository.save(account);
//			transaction.setStatus("SUCCESS");
//		}
//		transaction.setStatus("SUCCESS");
//		transaction.setTimeStamp(transactionTime);
//		return transactionRepository.save(transaction);
//		
//		
//		
////		 System.out.println("dffhrgh" + transaction.getDebitAccnt());
////	        Account account = accRepository.findByAccNo(transaction.getDebitAccnt());
////	        double transactionAmt = transaction.getAmt();
////	        double balance = account.getBalance();
////	        System.out.println(account.isDisabled() + "hih");
////	        System.out.println((transactionAmt < balance) + "balance" );
////	        System.out.println(accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD") + "deb");
////	        System.out.println(accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD") + "cred");
////	     
////		
////		System.out.println(accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled());
////        if(transactionAmt > balance || account.isDisabled() || accRepository.findByAccNo(transaction.getCreditAccnt()).isDisabled() || accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD") || accRepository.findByAccNo(transaction.getDebitAccnt()).getAccType().equals("FD")){
////            transaction.setStatus("FAIL");
////        }
////        else{
////            Account accCredited = accRepository.findByAccNo(transaction.getCreditAccnt());
////            transaction.setStatus("SUCCESS");
////            balance -= transactionAmt;
////            if(transaction.getDebitAccnt() != transaction.getCreditAccnt()){
////                double accCreditedBalance = accCredited.getBalance();
////                accCreditedBalance += transactionAmt;
////                accCredited.setBalance(accCreditedBalance);
////                accRepository.save(accCredited);
////            }
////            account.setBalance(balance);
////            accRepository.save(account);
////        }
////        transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccnt()));
////        String transactionTime =   getCurrentDateTimeStamp();
////        transaction.setTimeStamp(transactionTime);
////        System.out.println("iugb" + transaction);
////        return transactionRepository.save(transaction);
//	}

	private static String getCurrentDateTimeStamp() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS");
		String timeStamp = now.format(formatter);
		return timeStamp;
	}
}
