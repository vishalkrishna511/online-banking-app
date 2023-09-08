package com.onlinebanking.serverside.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

}
