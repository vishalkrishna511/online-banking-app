
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

package com.onlinebanking.serverside;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinebanking.serverside.dao.AccRepository;
import com.onlinebanking.serverside.model.Account;
import com.onlinebanking.serverside.service.AccountService;
import com.onlinebanking.serverside.service.AdminService;
import com.onlinebanking.serverside.service.CustomerService;
import com.onlinebanking.serverside.service.LoginService;
import com.onlinebanking.serverside.service.TransactionService;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

// add required annotations for running the test cases

@RunWith(SpringRunner.class)
@WebMvcTest
public class AccountControllerTest {
	@Autowired
	MockMvc mvc;

	@MockBean
	CustomerService customerService;

	@MockBean
	AccountService accountService;

	@MockBean
	AdminService adminService;

	@MockBean
	LoginService loginService;

	@MockBean
	TransactionService transactionService;

	@MockBean
	AccRepository accRespository;

	ObjectMapper mapper = new ObjectMapper();

	@Test
	public void testAddAccount() throws Exception {
		Account account = new Account();
		account.setAccNo(123456789012L);
		account.setAccType("Savings");
		account.setBalance(1000000);
		account.setBranch("Kolkata");
		account.setIfsc("KOLK69855WB");
		account.setDisabled(false);
		account.setOpeningDate("18-09-2023");

		Long userId = 1L;

		Mockito.when(accountService.save(any(Account.class), eq(userId))).thenReturn(account);

		String json = mapper.writeValueAsString(account);
		mvc.perform(post("/addAccount/{userId}", 1L).contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}

	@Test
	public void viewAccount() throws Exception {

		Account account = new Account();

		account.setAccNo(123456789012L);
		account.setAccType("Savings");
		account.setBalance(1000000);
		account.setBranch("Kolkata");
		account.setIfsc("KOLK69855WB");
		account.setDisabled(false);
		account.setOpeningDate("18-09-2023");

		Long userId = 1L;

		List<Account> accList = new ArrayList<Account>();
		accList.add(account);

		Mockito.when(accountService.viewAccount(ArgumentMatchers.anyLong())).thenReturn(accList);

		String json = mapper.writeValueAsString(accList);
		mvc.perform(get("/fetchAccounts/{userId}", 1L).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

	}

	@Test
	public void getAccountDetails() throws Exception {
		Account account = new Account();

		account.setAccNo(123456789012L);
		account.setAccType("Savings");
		account.setBalance(1000000);
		account.setBranch("Kolkata");
		account.setIfsc("KOLK69855WB");
		account.setDisabled(false);
		account.setOpeningDate("18-09-2023");

		Long accNo = 123456789012L;

		Mockito.when(accountService.getAccountDetails(ArgumentMatchers.anyLong())).thenReturn(account);

		String json = mapper.writeValueAsString(account);
		mvc.perform(get("/getAccountDetails/{accNo}",123456789012L ).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

	}
}
