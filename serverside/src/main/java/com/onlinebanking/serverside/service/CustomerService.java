package com.onlinebanking.serverside.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.exceptions.NoDataFoundExcepction;
import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.model.Customer;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerRepository;

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

}
