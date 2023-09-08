package com.onlinebanking.serverside.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity 
@Data
public class Transaction {
	@Id
	@GeneratedValue
	@Column	(nullable = false)
	private long txnId;
	@Column	(nullable = false)
	private String txnType;
	@Column	(nullable = false)
	private double amt;
	@Column	(nullable = false)
	private long debitAccnt;
	@Column	(nullable = false)
	private long creditAccnt;
	@Column	(nullable = false)
	private String timeStamp;
	@Column	(nullable = false)
	private String status;
	
	@ManyToOne
	@JoinColumn(name= "accNo")
	private Account accNo; 

}
