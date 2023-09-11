package com.onlinebanking.serverside.dao;

import com.onlinebanking.serverside.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

}
