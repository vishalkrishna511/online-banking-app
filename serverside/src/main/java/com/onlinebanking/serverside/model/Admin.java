package com.onlinebanking.serverside.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

import javax.persistence.GenerationType;

@Entity
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long adminId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String pswd;

	public long getAdminId() {
		return adminId;
	}

	public void setAdminId(long adminId) {
		this.adminId = adminId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPswd() {
		return pswd;
	}

	public void setPswd(String pswd) {
		this.pswd = pswd;
	}
    
    

}
