package com.onlinebanking.serverside.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.exceptions.NoDataFoundExpection;
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
	public Customer getCustomer(long userId){
		return customerRepository.findByUserId(userId);
	}

	public Customer getCustomerDetails(Long id) throws CustomerNotFoundException {

		Customer customer = null;
		customer = customerRepository.findByUserId(id);

		if (customer == null) {
			throw new CustomerNotFoundException("User not found! or Invalid user Id " + id);
		}

		return customer;
	}

//	public List<Long> fetchAccounts(Long id) throws NoDataFoundExpection {
//		if(accRepository.findAccountNumbersByUserId(id).isEmpty()) {
//			throw new NoDataFoundExpection("No Accounts Found!");
//		}
//		return accRepository.findAccountNumbersByUserId(id);
//	}

}
