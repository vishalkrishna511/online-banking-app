package com.onlinebanking.serverside.controller;

import java.util.List;

import com.onlinebanking.serverside.exceptions.AccountAlreadyExistsException;
import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.exceptions.TransactionsNotFoundException;
import com.onlinebanking.serverside.model.AccountStatement;
import com.onlinebanking.serverside.model.Transaction;
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
import org.springframework.web.server.ResponseStatusException;

import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.service.AccountService;

@RestController
@Validated
@CrossOrigin
public class AccountController {

	@Autowired
	AccountService accountService;

	@PostMapping("/addAccount/{userId}")
	public ResponseEntity<?> addAccount(@RequestBody Account account, @PathVariable("userId") Long userId)
			throws AccountAlreadyExistsException, CustomerNotFoundException {
		Account response = accountService.save(account, userId);
		return ResponseEntity.status(HttpStatus.OK).body("Account Created");
	}

	@GetMapping("/fetchAccounts/{userId}")
	public ResponseEntity<?> viewAccount(@PathVariable("userId") long userId)
			throws AccountNotFoundException, CustomerNotFoundException {

		List<Account> response = accountService.viewAccount(userId);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/getAccountDetails/{accNo}")
	public Account getAccountDetails(@PathVariable("accNo") long accNo) throws AccountNotFoundException {
		return accountService.getAccountDetails(accNo);
	}
	
	@GetMapping("/getAccountBalance/{accNo}")
	public double getAccountBalance(@PathVariable("accNo") long accNo) throws AccountNotFoundException {
		return accountService.getAccountBalance(accNo);
	}

	@PostMapping("getAccountStatement/{accNo}")
	public List<Transaction> getAccountStatement(@RequestBody AccountStatement accountStatement, @PathVariable long accNo)
			throws TransactionsNotFoundException {
		return accountService.getAccountStatement(accNo, accountStatement);

	}
}
