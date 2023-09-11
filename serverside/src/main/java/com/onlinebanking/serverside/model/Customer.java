package com.onlinebanking.serverside.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data

public class Customer {

	@Id
	@Column(nullable = false)
	private Long userId;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String pswd;
	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private long mobile;
	@Column(unique = true, nullable = false)
	private String aadhar;
	@Column(nullable = false)
	private String dob;
	private String city;
	private String state;
	@Column(nullable = false)
	private String country;
	private String fatherName;
	private String motherName;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Account> accnts;

}
