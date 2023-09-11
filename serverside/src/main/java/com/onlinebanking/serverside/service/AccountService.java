package com.onlinebanking.serverside.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.model.Account;

@Service
public class AccountService {
    @Autowired
    private AccRepository accRepository;

    public Account save(Account account) {

        Account response = accRepository.findByAccNo(account.getAccNo());
        if (response == null) {
            return accRepository.save(account);
        } else return null;

    }
}
