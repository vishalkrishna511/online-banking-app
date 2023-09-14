package com.onlinebanking.serverside.dao;

import java.util.List;

import com.onlinebanking.serverside.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Account;

@Repository
public interface AccRepository extends JpaRepository<Account, Long> {
	public Account findByAccNo(long AccNo);

	public List<Account> findByUser(Customer userId);
}
