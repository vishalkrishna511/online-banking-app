package com.onlinebanking.serverside.exceptions;

import com.onlinebanking.serverside.model.Transaction;

public class TransactionsNotFoundException extends NoDataFoundExcepction{
    public TransactionsNotFoundException(String msg){
        super(msg);
    }
}
