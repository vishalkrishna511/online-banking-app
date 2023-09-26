package com.onlinebanking.serverside.exceptions;

import javax.persistence.EntityExistsException;

public class CustomerAlreadyExistsException extends EntityExistsException {
    public CustomerAlreadyExistsException(String msg){
        super(msg);
    }
}
