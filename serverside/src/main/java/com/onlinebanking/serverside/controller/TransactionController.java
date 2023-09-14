package com.onlinebanking.serverside.controller;

import javax.validation.Valid;

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

	@PostMapping("/addTransaction")
	public ResponseEntity<?> addTransaction(@RequestBody @Valid Transaction c) {

		Transaction response = transactionService.save(c);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflicting Transaction details");
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

}
