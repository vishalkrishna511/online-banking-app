package com.onlinebanking.serverside.exceptions;

import lombok.Data;

@Data
public class InvalidInputException extends RuntimeException{

    public InvalidInputException(String msg){
        super(msg);
    }
}
