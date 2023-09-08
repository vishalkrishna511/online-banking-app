package com.onlinebanking.serverside.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Account;

@Repository
public interface AccRepository extends JpaRepository<Account, Long> {

}
