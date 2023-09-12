package com.onlinebanking.serverside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.service.AccountService;

import java.util.List;

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
	public ResponseEntity<?> viewAccount(@PathVariable("userId") long userId){
        return ResponseEntity.status(HttpStatus.OK).body(accountService
				.viewAccount(userId));
	}
}
