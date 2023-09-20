package com.onlinebanking.serverside.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Random;
import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.dao.LoginRepository;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.exceptions.NoDataFoundExcepction;
import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.model.Login;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	LoginRepository loginRepository;
	

	@Autowired
	LoginService loginService;

	@Autowired
	AccRepository accRepository;

	public Customer save(Customer customer) {
		Customer response = customerRepository.findByUserId(customer.getUserId());
		if (response == null) {
			Customer resp = customerRepository.save(customer);
			if (resp == null)
				return null;
			loginService.getLoginObject(resp.getUserId(), resp.getPswd());
			return resp;
		} else
			return null;
	}
	public Boolean resetPassword(Login login,String currentPassword) {
		
		Customer changePassword = customerRepository.findByUserId(login.getUserId());
		Login loginPassword = loginRepository.findByUserId(login.getUserId());
		
		
		if(loginPassword==null||changePassword==null) return false;
		
		if(currentPassword.equals(loginPassword.getPswd())) {
			changePassword.setPswd(login.getPswd());
			loginPassword.setPswd(login.getPswd());
			customerRepository.save(changePassword);
			loginRepository.save(loginPassword);
			return true;}
		return false;
	}

	public String forgetPassword(Login login) {
		Customer customer = customerRepository.findByUserId(login.getUserId());
		if(customer==null) return "User not found";

		Random random = new Random();
		int randomNumber = random.nextInt(900000) + 100000;

		return Integer.toString(randomNumber);
	}

	public Customer getCustomer(long userId) {
		return customerRepository.findByUserId(userId);
	}

	public Customer getCustomerDetails(Long id) throws ResponseStatusException {

		Customer customer = null;
		customer = customerRepository.findByUserId(id);
		if (customer == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found! or Invalid user Id " + id);
		}

		return customer;
	}
	public String forgetPasswordNew(Login login) {
		// TODO Auto-generated method stub
		Customer customer = customerRepository.findByUserId(login.getUserId());
		if(customer==null) return null; 
		customerRepository.save(customer);
		loginRepository.save(login);

		return login.getPswd();
	}


}
