package com.onlinebanking.serverside.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.dao.AdminRepository;
import com.onlinebanking.serverside.model.Admin;
import com.onlinebanking.serverside.model.Account;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AccRepository accRepository;

    public Admin save(Admin a) {
        Admin response = adminRepository.findByUsername(a.getUsername());
        if (response == null) {
            return adminRepository.save(a);
        }
        return null;
    }

    public boolean login(Admin a) {
        Admin response = adminRepository.findByUsername(a.getUsername());
        if (response == null)
            return false;
        if (response.getPswd().equals(a.getPswd()))
            return true;
        return false;
    }

    public List<Account> getDisabledAccounts() {
        return adminRepository.getDisabledAccounts();
    }

    public boolean toggleIsDisabled(long accNo) {
        Account account = accRepository.findByAccNo(accNo);
        int count = adminRepository.updateIsDisabled(accNo, !account.isDisabled());
        return count == 1 ? true : false;
    }
}
