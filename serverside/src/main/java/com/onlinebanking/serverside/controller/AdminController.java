package com.onlinebanking.serverside.controller;

import java.util.List;

import com.onlinebanking.serverside.exceptions.AccountNotFoundException;
import com.onlinebanking.serverside.exceptions.CustomerNotFoundException;
import com.onlinebanking.serverside.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.model.Admin;
import com.onlinebanking.serverside.service.AdminService;

@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin a) {
        Admin response = adminService.save(a);

        if (response == null)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Admin details Invalid");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/admin/login")
    public boolean loginAdmin(@RequestBody Admin a) {
        boolean response = adminService.login(a);
        return response;
    }

    @DeleteMapping("/admin/deleteAccount/{accNo}")
    public boolean deleteAccount(@PathVariable("accNo") long accNo)
        throws AccountNotFoundException {
        boolean response = adminService.deleteAccount(accNo);
        return response;
    }

    @GetMapping("/admin/pendingAccounts")
    public ResponseEntity<?> getPendingAccounts() {
        List<Account> pendingAccounts = adminService.getDisabledAccounts();

        if (pendingAccounts == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Account[0]);

        return ResponseEntity.status(HttpStatus.OK).body(pendingAccounts);
    }

    @PutMapping("/admin/toggleAccount/{accNo}")
    public boolean toggleAccount(@PathVariable("accNo") Long accNo) {
        boolean response = adminService.toggleIsDisabled(accNo);
        return response;
//        if (response == false)
//            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("The Account status could not be changed");
//
//        return ResponseEntity.status(HttpStatus.OK).body(accNo + " has been toggled succesfully");
    }

    @PutMapping("/admin/editCustomer/{userId}")
    public boolean editCustomer(@PathVariable("userId") Long userId, @RequestBody Customer customer)
            throws CustomerNotFoundException {
        boolean response = adminService.editCustomer(customer);
        return response;
    }

}

