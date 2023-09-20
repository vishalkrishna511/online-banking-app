package com.onlinebanking.serverside.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.onlinebanking.serverside.model.Account;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

// add required annotations for running the test cases

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class AccountControllerTest {

    @Test
    public void testAddAccount() throws Exception {
    }

    @Test
    public void viewAccount() {
    }

    @Test
    public void getAccountDetails() {
    }
}
