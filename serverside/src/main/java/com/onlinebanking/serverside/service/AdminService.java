package com.onlinebanking.serverside.service;

import java.util.List;

import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.model.Customer;
import org.checkerframework.checker.units.qual.C;
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

    @Autowired
    TransactionService transactionService;

    @Autowired
    CustomerRepository customerRepository;

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

    public boolean deleteAccount(long accNo) throws AccountNotFoundException {
        Account account = accRepository.findByAccNo(accNo);
        if (account == null)
            throw new AccountNotFoundException("No account exists with the given account number!");
        boolean res = transactionService.deleteTransactionByAccNo(account);
        accRepository.deleteByAccNo(accNo);
        return (accRepository.findByAccNo(accNo) == null);
    }

    public boolean editCustomer(Customer customer) throws CustomerNotFoundException {
        Customer response = customerRepository.findByUserId(customer.getUserId());
        if (response == null)
            throw new CustomerNotFoundException("No customer exists with the provided user Id!");
        Customer editedCustomer = customerRepository.save(customer);
        return true;
    }
}
