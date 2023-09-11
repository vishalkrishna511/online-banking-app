package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.model.Customer;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	LoginService loginService;

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

}
