package com.onlinebanking.serverside;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot. test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.model.Login;
import com.onlinebanking.serverside.service.AccountService;
import com.onlinebanking.serverside.service.AdminService;
import com.onlinebanking.serverside.service.CustomerService;
import com.onlinebanking.serverside.service.LoginService;
import com.onlinebanking.serverside.service.TransactionService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class CustomerControllerTest {

	@Autowired
	MockMvc mvc;

	@MockBean
	CustomerService customerService;

	@MockBean
	LoginService loginService;

	@MockBean
	AccountService accountService;
	
	@MockBean
	AdminService adminService;

	@MockBean
	TransactionService transService;

	@MockBean
	CustomerRepository customerRepository;

	ObjectMapper mapper = new ObjectMapper();

	@Test
	public void testAddCustomer() throws Exception {
		Customer customer = new Customer();
		customer.setUserId(1L);
		customer.setAadhar("123456789012");
		customer.setCity("Bangalore");
		customer.setCountry("India");
		customer.setDob("1/1/2001");
		customer.setEmail("cust@email.com");
		customer.setMobile("9875421331");
		customer.setName("Arnav");
		customer.setPswd("password");
		customer.setState("Karnataka");

		Mockito.when(customerService.save(ArgumentMatchers.any())).thenReturn(customer);

		String json = mapper.writeValueAsString(customer);
		mvc.perform(post("/addCustomer").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}

	@Test
	public void testValidateCustomer() throws Exception {
		Login login = new Login();
		login.setUserId(1L);
		login.setPswd("password");

		Mockito.when(loginService.validateCustomer(ArgumentMatchers.any())).thenReturn(true);

		String json = mapper.writeValueAsString(login);
		mvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(json)
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}

	@Test
	public void testGetCustomerDetails() throws Exception {
		Customer customer = new Customer();
		customer.setUserId(1L);
		customer.setAadhar("123456789012");
		customer.setCity("Bangalore");
		customer.setCountry("India");
		customer.setDob("1/1/2001");
		customer.setEmail("cust@email.com");
		customer.setMobile("9875421331");
		customer.setName("Arnav");
		customer.setPswd("password");
		customer.setState("Karnataka");

//		List<Customer> allCustomers = new ArrayList<>();
//		allCustomers.add(customer);

		Mockito.when(customerService.getCustomerDetails(ArgumentMatchers.any())).thenReturn(customer);

//		System.out.println("test method");
		mvc.perform(get("/getCustomer/{id}", 1L).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).
		andExpect(jsonPath("$.name", Matchers.equalTo(customer.getName())));
				//.andExpect(jsonPath("$.city", Matchers.equalTo(customer.getCity())));
	}
}