package com.onlinebanking.serverside.controller;

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
	public ResponseEntity<?> addAccount(@RequestBody Account account, @PathVariable("userId") Long userId) {
		Account response = accountService.save(account, userId);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Account Already Exists");
		}
		return ResponseEntity.status(HttpStatus.OK).body("Account Created");
	}

	@GetMapping("/viewAccount/{userId}")
	public ResponseEntity<?> viewAccount(@PathVariable("userId") long userId) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.viewAccount(userId));
	}

	@GetMapping("/getAccountDetails/{accNo}")
	public Account getAccountDetails(@PathVariable("accNo") long accNo) throws ResponseStatusException {
		return accountService.getAccountDetails(accNo);
	}
}
