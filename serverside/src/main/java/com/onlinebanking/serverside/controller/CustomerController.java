package com.onlinebanking.serverside.controller;

import com.onlinebanking.serverside.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.service.CustomerService;

@RestController
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/addCustomer")
	public ResponseEntity<?> addCustomer(@RequestBody Customer c) {

			Customer response = customerService.save(c);
			if(response == null) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer details Invalid");
			}
			return ResponseEntity.status(HttpStatus.OK).body(response);

	}
	
}
