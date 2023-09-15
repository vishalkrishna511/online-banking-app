package com.onlinebanking.serverside.controller;

import java.util.List;

import javax.validation.Valid;

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

	@PostMapping("/addTransaction")
	public ResponseEntity<?> addTransaction(@RequestBody @Valid Transaction c) {

		Transaction response = transactionService.save(c);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflicting Transaction details");
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@GetMapping("/getTransactions/{debitAccnt}")
	public List<Transaction> getTransactions(@PathVariable("debitAccnt") long debitAccnt){
		return transactionService.getTransactions(debitAccnt);
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<?> withdrawMoney(@RequestBody @Valid Transaction transaction) {
		Transaction response = transactionService.withdrawMoney(transaction);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Transaction Declined");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Withdraw success");
	}
	
	@PostMapping("/deposit")
	public ResponseEntity<?> depositMoney(@RequestBody @Valid Transaction transaction) {
		Transaction response = transactionService.depositMoney(transaction);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction Declined");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Deposit success");
	}
	
//	@PostMapping("/withdraw/{accNo}")
//	public String cashWithdraw(@PathVariable("accNo") long accNo) {
//		return transactionService.cashWithdraw(accNo);
//	}
	
//	@PostMapping("/transact")
//	public ResponseEntity<?> transact(@RequestBody @Valid Transaction transaction) {
//		Transaction transacted = transactionService.transact(transaction);
//		System.out.println(transacted + "transacted");
////		if (transacted == null || transacted.getStatus().equals("FAIL")) {
////			return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Transaction");
////		} else 
//			return ResponseEntity.status(HttpStatus.OK).body("Success");
//	}

}
