package com.onlinebanking.serverside.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinebanking.serverside.dao.TransactionRepository;
import com.onlinebanking.serverside.model.Transaction;
import com.onlinebanking.serverside.service.TransactionService;

@RunWith(SpringRunner.class)
@WebMvcTest
class TransactionControllerTest {
	@Autowired
	MockMvc mvc;

	@Mock
	TransactionService transactionService;

	@Mock
	TransactionRepository transactionRepository;

	ObjectMapper mapper = new ObjectMapper();

	@Test
	public void testAddTransaction() throws Exception {
		Transaction transaction = new Transaction();
		transaction.setAmt(99.99);
		transaction.setCreditAccnt(100000000001L);
		transaction.setDebitAccnt(100000000003L);
		transaction.setStatus("success");
		transaction.setTimeStamp("21-09-2029 12:21:12");
		transaction.setTxnId(9827635L);
		transaction.setTxnType("NEFT");

		Mockito.when(transactionService.save(ArgumentMatchers.any())).thenReturn(transaction);

		String json = mapper.writeValueAsString(transaction);
		mvc.perform(post("/addTransaction")
				.contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
}