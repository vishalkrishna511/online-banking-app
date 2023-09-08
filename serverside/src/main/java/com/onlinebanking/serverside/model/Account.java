package com.onlinebanking.serverside.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;


@Entity
@Data
public class Account {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
		private long accNo;
	@Column(nullable = false)
	private String accType;
	@Column(nullable = false)
	private double balance;
	@Column(nullable = false)
	private String openingDate;
	@Column(nullable = false)
	private String ifsc;
	@Column(nullable = false)
	private String branch;
	private boolean isDisabled;
	
	@OneToMany
	@JoinColumn(name="accNo")
	private List<Transaction> txns;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private Customer user;
	
}
