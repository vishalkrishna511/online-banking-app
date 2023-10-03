package com.onlinebanking.serverside.controller;

import java.util.List;

import javax.validation.Valid;

import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.TransactionDeclinedException;
import com.onlinebanking.serverside.exceptions.InvalidTransactionException;
import com.onlinebanking.serverside.exceptions.TransactionsNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinebanking.serverside.model.Transaction;
import com.onlinebanking.serverside.service.TransactionService;

@RestController
@Validated
@CrossOrigin
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@PostMapping("/transact")
	public ResponseEntity<?> addTransaction(@RequestBody @Valid Transaction transaction)
			throws InvalidTransactionException, TransactionDeclinedException, AccountNotFoundException {
		Transaction transacted = transactionService.transact(transaction);
		if (transacted == null) {
			throw new InvalidTransactionException("Invalid Transaction");
		} else return ResponseEntity.status(HttpStatus.OK).body(transacted);
	}
	@GetMapping("/getTransactions/{Accnt}")
	public List<Transaction> getTransactions(@PathVariable("Accnt") long Accnt)
		throws TransactionsNotFoundException {
		return transactionService.getTransactions(Accnt);
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<?> withdrawMoney(@RequestBody @Valid Transaction transaction)
			throws TransactionDeclinedException, AccountNotFoundException{
		Transaction response = transactionService.withdrawMoney(transaction);
		return ResponseEntity.status(HttpStatus.OK).body("Withdraw success");
	}
	
	@PostMapping("/deposit")
	public ResponseEntity<?> depositMoney(@RequestBody @Valid Transaction transaction)
			throws TransactionDeclinedException, AccountNotFoundException{
		Transaction response = transactionService.depositMoney(transaction);
		return ResponseEntity.status(HttpStatus.OK).body("Deposit success");
	}
	
}
