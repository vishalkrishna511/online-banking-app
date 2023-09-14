package com.onlinebanking.serverside.service;

import com.onlinebanking.serverside.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.model.Transaction;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction save(Transaction transaction) {
        Transaction response = transactionRepository.findByTxnId(transaction.getTxnId());
        if (response == null) {
            return transactionRepository.save(transaction);
        } else return null;
    }
}