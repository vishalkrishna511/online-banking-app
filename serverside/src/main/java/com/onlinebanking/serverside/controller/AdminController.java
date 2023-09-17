package com.onlinebanking.serverside.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> loginAdmin(@RequestBody Admin a) {
        boolean response = adminService.login(a);

        if (response == false)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User has not register");

        return ResponseEntity.status(HttpStatus.OK).body("User logged in successfully");
    }

    @GetMapping("/admin/pendingAccounts")
    public ResponseEntity<?> getPendingAccounts() {
        List<Account> pendingAccounts = adminService.getDisabledAccounts();

        if (pendingAccounts == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Account[0]);

        return ResponseEntity.status(HttpStatus.OK).body(pendingAccounts);
    }

    @PutMapping("/admin/toggleAccount/{accNo}")
    public ResponseEntity<?> toggleAccount(@PathVariable("accNo") Long accNo) {
        boolean response = adminService.toggleIsDisabled(accNo);

        if (response == false)
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("The Account status could not be changed");

        return ResponseEntity.status(HttpStatus.OK).body(accNo + " has been toggled succesfully");
    }
}
