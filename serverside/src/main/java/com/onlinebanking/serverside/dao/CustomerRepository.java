package com.onlinebanking.serverside.dao;

import com.onlinebanking.serverside.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    public Customer findByUserId(long userId);
}
