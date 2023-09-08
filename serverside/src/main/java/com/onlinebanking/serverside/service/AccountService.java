package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.model.Account;

@Service
public class AccountService {
    @Autowired
    private AccRepository accRepository;

    public String save(Account account) {
        Account response = accRepository.save(account);
        if (response != null) {
			return "Account data saved successfully!";
		} else {
			return "An error occured while saving account data";
		}
    }
}
