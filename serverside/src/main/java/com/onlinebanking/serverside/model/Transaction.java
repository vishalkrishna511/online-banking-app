package com.onlinebanking.serverside.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

@Entity
@Data
public class Transaction {
	

	@Id
	@GeneratedValue
	@Column(nullable = false)
	private long txnId;
	@Column(nullable = false)
	private String txnType;
	@Column(nullable = false)
	@Positive(message = "Amount should be positive")
	private double amt;
	@Column(nullable = false)
//	@Pattern(regexp = "\\d{12}", message = "Debit Account number must be 12 digits")
	private long debitAccount;

//	@Pattern(regexp = "\\d{12}", message = "Credit Account number must be 12 digits")
	private long creditAccount;
	@Column(nullable = false)
	private String timeStamp;
	@Column(nullable = false)
	private String status;

	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "accNo")
	private Account accNo;


	
}
