package com.onlinebanking.serverside.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinebanking.serverside.dao.CustomerRepository;
import com.onlinebanking.serverside.model.Customer;
import com.onlinebanking.serverside.service.CustomerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class CustomerControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Mock
    CustomerService customerService;

    @Mock
    CustomerRepository customerRepository;

    ObjectMapper mapper = new ObjectMapper();


    @Test
    public void testAddCustomer() throws Exception{
        Customer customer = getCustomer();

        Mockito.when(customerService.save(ArgumentMatchers.any())).thenReturn(customer);

        String json = mapper.writeValueAsString(customer);
        mockMvc.perform(post("/addCustomer")
                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    private static Customer getCustomer() {
        Customer customer = new Customer();
        customer.setUserId(4);
        customer.setAadhar("900080004000");
        customer.setName("Krishna");
        customer.setPswd("1234567890");
        customer.setEmail("abc@gmail.com");
        customer.setMobile("9890989099");
        customer.setAadhar("989900001234");
        customer.setDob("05-11-2001");
        customer.setCity("Bengaluru");
        customer.setState("Tamil Nadu");
        customer.setCountry("India");
        customer.setCountry(null);
        return customer;
    }


}
