package com.onlinebanking.serverside.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.model.Login;
import com.onlinebanking.serverside.service.CustomerService;
import com.onlinebanking.serverside.service.LoginService;



@RestController
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	LoginService LoginService;
	
	@PostMapping("/addCustomer")
	public ResponseEntity<?> addCustomer(@RequestBody Customer c) {

			Customer response = customerService.save(c);
			if(response == null) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer details Invalid");
			}
			return ResponseEntity.status(HttpStatus.OK).body(response);

	}
	
	@PostMapping("/login")
	public String validateCustomer(@RequestBody Login login) {
		return LoginService.validateCustomer(login);
	}
	
}
