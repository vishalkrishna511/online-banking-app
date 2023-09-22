
//package com.onlinebanking.serverside.controller;
//
//import org.junit.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.onlinebanking.serverside.model.Account;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//// add required annotations for running the test cases
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@RunWith(SpringRunner.class)
//public class AccountControllerTest {
//    // complete the test cases
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @MockBean
//    private AccountService accountService;
//
//    @MockBean
//    private AccountRepository accountRepository;
//
//    @Test
//    public void testAddAccount() throws Exception {
//        // complete the test case
//        Account account = new Account();
//        account.setAccountNumber(1234567890);
//        account.setAccountType("Savings");
//        account.setBalance(10000);
//        account.setCustomerId(1);
//        account.setIfsc("HDFC0000001");
//        account.setOpeningDate("2020-01-01");
//        account.setBranch("HDFC");
//        account.setBranchCode("HDFC0000001");
//        account.setBranchAddress("Bangalore");
//        account.setBranchCity("Bangalore");
//        account.setBranchState("Karnataka");
//        account.setBranchCountry("India");
//        account.setBranchZipcode(560001);
//        account.setBranchPhoneNumber(1234567890);
//        account.setBranchFaxNumber(1234567890);
//        account.setBranchEmail("ar@gmail.com");
//
//        Mockito.when(accountService.addAccount(Mockito.any(Account.class))).thenReturn(account);
//        String json = objectMapper.writeValueAsString(account);
//        mockMvc.perform(post("/api/account/addAccount")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(json)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.accountNumber", Matchers.equalTo(1234567890)))
//                .andExpect(jsonPath("$.accountType", Matchers.equalTo("Savings")))
//                .andExpect(jsonPath("$.balance", Matchers.equalTo(10000)))
//                .andExpect(jsonPath("$.customerId", Matchers.equalTo(1)))
//                .andExpect(jsonPath("$.ifsc", Matchers.equalTo("HDFC0000001")))
//                .andExpect(jsonPath("$.openingDate", Matchers.equalTo("2020-01-01")))
//                .andExpect(jsonPath("$.branch", Matchers.equalTo("HDFC")))
//                .andExpect(jsonPath("$.branchCode", Matchers.equalTo("HDFC0000001")))
//                .andExpect(jsonPath("$.branchAddress", Matchers.equalTo("Bangalore")))
//                .andExpect(jsonPath("$.branchCity", Matchers.equalTo("Bangalore")))
//                .andExpect(jsonPath("$.branchState", Matchers.equalTo("Karnataka")))
//                .andExpect(jsonPath("$.branchCountry", Matchers.equalTo("India")))
//                .andExpect(jsonPath("$.branchZipcode", Matchers.equalTo(560001)))
//                .andExpect(jsonPath("$.branchPhoneNumber", Matchers.equalTo(1234567890)))
//                .andExpect(jsonPath("$.branchFaxNumber", Matchers.equalTo(1234567890)))
//                .andExpect(jsonPath("$.branchEmail", Matchers.equalTo("ar@gmail.com")));
//
//
//    }
//
//    @Test
//    public void viewAccount() {
//    }
//
//    @Test
//    public void getAccountDetails() {
//    }
//}

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
//>>>>>>> ad681d7369731b49d622e656f38c39dc9ca9b756
