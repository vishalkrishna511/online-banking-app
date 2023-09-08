package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.model.Customer;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	public Customer save(Customer customer) {
		return customerRepository.save(customer);
	}
}
