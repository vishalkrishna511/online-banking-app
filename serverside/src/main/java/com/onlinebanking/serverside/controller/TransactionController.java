package com.onlinebanking.serverside.controller;

import javax.validation.Valid;

import com.onlinebanking.serverside.exceptions.InvalidTransactionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	public ResponseEntity<?> addTransaction(@RequestBody @Valid Transaction transaction) throws InvalidTransactionException {
		Transaction transacted = transactionService.transact(transaction);
		System.out.println(transacted + "transacted");
		if (transacted == null || transacted.getStatus().equals("FAIL")) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Transaction");
		} else return ResponseEntity.status(HttpStatus.OK).body(transacted);
	}
}