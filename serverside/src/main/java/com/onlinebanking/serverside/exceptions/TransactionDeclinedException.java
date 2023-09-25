package com.onlinebanking.serverside.exceptions;

import lombok.Data;

@Data
public class TransactionDeclinedException extends RuntimeException{
    public TransactionDeclinedException(String msg){
        super(msg);
    }
}
