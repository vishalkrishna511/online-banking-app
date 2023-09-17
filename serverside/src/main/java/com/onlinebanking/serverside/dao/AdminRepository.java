package com.onlinebanking.serverside.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    public Admin findByUsername(String username);

    @Query("UPDATE Account a SET a.isDisabled = ?2 WHERE a.accNo = ?1")
    @Transactional
    @Modifying
    public int updateIsDisabled(long accNo, boolean status);

    @Query("SELECT a FROM Account a where a.isDisabled = true")
    public List<Account> getDisabledAccounts();

}
