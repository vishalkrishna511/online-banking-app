package com.onlinebanking.serverside.controller;

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
import org.springframework.web.server.ResponseStatusException;

import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.model.Login;
import com.onlinebanking.serverside.service.CustomerService;
import com.onlinebanking.serverside.service.LoginService;

@RestController
@Validated
@CrossOrigin
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@Autowired
	LoginService loginService;

	@PostMapping("/addCustomer")
	public ResponseEntity<?> addCustomer(@Valid @RequestBody Customer c) {

		Customer response = customerService.save(c);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer details Invalid");
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);

	}

	@PostMapping("/resetPassword/{currentPassword}")
	public ResponseEntity<?> resetPassword(@PathVariable("currentPassword") String currentPassword ,@RequestBody Login login){
		
		Boolean setOrNot = customerService.resetPassword(login,currentPassword);
		if(setOrNot == false) {return ResponseEntity.status(HttpStatus.CONFLICT).body("Not Able to change password");}
		return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully");
	}
	@PostMapping("/genOtp")
	public ResponseEntity<?> genOtp(@RequestBody Login login){

		String otp = customerService.forgetPassword(login);
		if(otp.equals("User not found")) {return ResponseEntity.status(HttpStatus.CONFLICT).body("INVALID OTP");}
		return ResponseEntity.status(HttpStatus.OK).body(otp);
	}
	@PostMapping("/forgetPasswordNew")
	public ResponseEntity<?> forgetPasswordNew(@RequestBody Login login){

		String newPass = customerService.forgetPasswordNew(login);
		if(newPass == null) {return ResponseEntity.status(HttpStatus.CONFLICT).body("INVALID OTP");}
		return ResponseEntity.status(HttpStatus.OK).body(newPass);
	}
	
	@PostMapping("/login")
	public Boolean validateCustomer(@RequestBody Login login) {
		return loginService.validateCustomer(login);
	}

	@GetMapping("/getCustomer/{id}")
	public Customer getCustomerDetails(@PathVariable("id") Long id) throws ResponseStatusException {
		return customerService.getCustomerDetails(id);
	}

}
