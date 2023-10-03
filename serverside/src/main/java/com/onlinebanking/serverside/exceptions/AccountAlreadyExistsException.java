package com.onlinebanking.serverside.exceptions;

import lombok.Data;

import javax.persistence.EntityExistsException;

@Data
public class AccountAlreadyExistsException extends EntityExistsException {
    public AccountAlreadyExistsException(String msg){
        super(msg);
    }
}
