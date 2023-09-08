package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.model.Transaction;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public String save(Transaction transaction) {
        Transaction response = transactionRepository.save(transaction);
        if (response != null) {
			return "Transaction data saved successfully!";
		} else {
			return "An error occured while saving transaction data";
		}
    }
}
