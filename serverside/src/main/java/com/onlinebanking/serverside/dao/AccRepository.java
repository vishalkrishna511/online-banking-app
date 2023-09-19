package com.onlinebanking.serverside.dao;

import java.util.List;

import com.onlinebanking.serverside.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Account;

import javax.transaction.Transactional;

@Repository
public interface AccRepository extends JpaRepository<Account, Long> {
	public Account findByAccNo(long AccNo);

	public List<Account> findByUser(Customer userId);

	@Modifying
	@Transactional
	@Query("delete from Account a where a.accNo=:accNo")
	void deleteByAccNo(long accNo);
}
