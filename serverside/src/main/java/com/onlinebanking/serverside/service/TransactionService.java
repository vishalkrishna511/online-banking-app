package com.onlinebanking.serverside.service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.exceptions.InvalidTransactionException;
import com.onlinebanking.serverside.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.model.Transaction;

import java.text.SimpleDateFormat;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccRepository accRepository;

    public Transaction transact(Transaction transaction) {
        System.out.println("dffhrgh" + transaction.getDebitAccount());
        Account account = accRepository.findByAccNo(transaction.getDebitAccount());
        double transactionAmt = transaction.getAmt();
        double balance = account.getBalance();
        System.out.println(account.isDisabled() + "hih");
        System.out.println((transactionAmt < balance) + "balance" );
        System.out.println(accRepository.findByAccNo(transaction.getDebitAccount()).getAccType().equals("FD") + "deb");
        System.out.println(accRepository.findByAccNo(transaction.getDebitAccount()).getAccType().equals("FD") + "cred");
        System.out.println(accRepository.findByAccNo(transaction.getCreditAccount()).isDisabled());
        if(transactionAmt > balance || account.isDisabled() || accRepository.findByAccNo(transaction.getCreditAccount()).isDisabled() || accRepository.findByAccNo(transaction.getDebitAccount()).getAccType().equals("FD") || accRepository.findByAccNo(transaction.getDebitAccount()).getAccType().equals("FD")){
            transaction.setStatus("FAIL");
        }
        else{
            Account accCredited = accRepository.findByAccNo(transaction.getCreditAccount());
            transaction.setStatus("SUCCESS");
            balance -= transactionAmt;
            if(transaction.getDebitAccount() != transaction.getCreditAccount()){
                double accCreditedBalance = accCredited.getBalance();
                accCreditedBalance += transactionAmt;
                accCredited.setBalance(accCreditedBalance);
                accRepository.save(accCredited);
            }
            account.setBalance(balance);
            accRepository.save(account);
        }
        transaction.setAccNo(accRepository.findByAccNo(transaction.getDebitAccount()));
        String transactionTime =   new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
        transaction.setTimeStamp(transactionTime);
        System.out.println("iugb" + transaction);
        return transactionRepository.save(transaction);
    }
}
