package com.onlinebanking.serverside.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

	public Login findByUserId(long userId) ;
	

	
}
