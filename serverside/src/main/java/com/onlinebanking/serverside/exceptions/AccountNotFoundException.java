package com.onlinebanking.serverside.exceptions;

import org.springframework.http.HttpStatus;

public class AccountNotFoundException extends RuntimeException{
	public AccountNotFoundException(String msg) {
		super(msg);
	}
}
