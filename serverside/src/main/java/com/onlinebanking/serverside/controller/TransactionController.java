package com.onlinebanking.serverside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinebanking.serverside.model.Transaction;
import com.onlinebanking.serverside.service.TransactionService;

@RestController
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@PostMapping("/addTransaction")
	public String addTransaction(@RequestBody Transaction c) {
		String response = transactionService.save(c);
		return response;
	}
	
}
