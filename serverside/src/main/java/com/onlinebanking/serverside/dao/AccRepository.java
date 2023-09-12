package com.onlinebanking.serverside.dao;

import java.util.List;

import com.onlinebanking.serverside.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Account;

@Repository
public interface AccRepository extends JpaRepository<Account, Long> {
	public Account findByAccNo(long AccNo);

//	@Query("SELECT acc_no FROM Account WHERE user_id=1")
//	public List<Account> FindByUserId(Long id);
//	@Query("SELECT acc_no FROM bankdb.account WHERE user_id :userId")
//	List<Long> findAccountNumbersByUserId(@Param("userId") Long userId);
	public List<Account> findByUser(Customer userId);
}
