package com.onlinebanking.serverside.service;

import com.onlinebanking.serverside.dao.LoginRepository;
import com.onlinebanking.serverside.model.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;

    public void getLoginObject(long uId, String pswd) {
        /* -> To Refactor the code for LoginModel*/
        Login login = new Login();
        login.setUserId(uId);
        login.setPswd(pswd);
        loginRepository.save(login);
    }
}
