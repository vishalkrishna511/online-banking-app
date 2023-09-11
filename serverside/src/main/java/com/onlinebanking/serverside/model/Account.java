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
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
	@Id
	private long accNo;
	@Column(nullable = false)
	private String accType;

	public long getAccNo() {
		return accNo;
	}

	public void setAccNo(long accNo) {
		this.accNo = accNo;
	}

	@Column(nullable = false)
	private double balance;
	@Column(nullable = false)
	private String openingDate;
	@Column(nullable = false)
	@Pattern(regexp = "\\d{11}", message = "IFSC must be 11 digits")
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
