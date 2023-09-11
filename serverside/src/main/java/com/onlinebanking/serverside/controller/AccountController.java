package com.onlinebanking.serverside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.service.AccountService;

@RestController
public class AccountController {
	
	@Autowired
	private AccountService accountService;

	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody Account a) {
		Account response = accountService.save(a);
		if(response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Account Already Exists");
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
