package com.onlinebanking.serverside.model;

import lombok.Data;

@Data
public class AccountStatement {
    private String fromDate;
    private String toDate;
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
    
}
