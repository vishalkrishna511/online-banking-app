package com.onlinebanking.serverside.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Customer {
	
	@Id
	private String userId;
	private String name;
	private String pwd;
	private String email;
	private long mobile;
	private String aadhar;
	private String dob;
	private String address;
	private String fatherName;
	private String motherName;
	
}
