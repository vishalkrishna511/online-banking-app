package com.onlinebanking.serverside.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

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
	private long debitAccnt;
	@Column(nullable = false)
//	@Pattern(regexp = "\\d{12}", message = "Credit Account number must be 12 digits")
	private long creditAccnt;
	@Column(nullable = false)
	private String timeStamp;
	@Column(nullable = false)
	private String status;

	@ManyToOne
	@JoinColumn(name = "accNo")
	private Account accNo;

	public long getTxnId() {
		return txnId;
	}

	public void setTxnId(long txnId) {
		this.txnId = txnId;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public double getAmt() {
		return amt;
	}

	public void setAmt(double amt) {
		this.amt = amt;
	}

	public long getDebitAccnt() {
		return debitAccnt;
	}

	public void setDebitAccnt(long debitAccnt) {
		this.debitAccnt = debitAccnt;
	}

	public long getCreditAccnt() {
		return creditAccnt;
	}

	public void setCreditAccnt(long creditAccnt) {
		this.creditAccnt = creditAccnt;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Account getAccNo() {
		return accNo;
	}

	public void setAccNo(Account accNo) {
		this.accNo = accNo;
	}
	
	
}
