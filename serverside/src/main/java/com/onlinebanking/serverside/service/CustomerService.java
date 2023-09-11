package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.model.Customer;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	public String save(Customer customer) {
		try {
			System.out.println(customer.getUserId());
			Customer response = customerRepository.save(customer);
			if (response != null) {
				return "Customer data saved successfully!";
			} else {
				return "An error occured while saving customer data";
			}
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
