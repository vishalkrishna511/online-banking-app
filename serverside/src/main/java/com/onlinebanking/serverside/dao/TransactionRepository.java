package com.onlinebanking.serverside.dao;

import java.util.List;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.onlinebanking.serverside.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	public Transaction findByTxnId(long txn);

	@Query(value = "SELECT t FROM Transaction t where t.debitAccnt = ?1")
	public List<Transaction> findAllByDebitAccnt(long debitAccnt);


	@Query(value = "SELECT txn FROM Transaction txn where txn.debitAccnt = ?1 AND txn.status = ?2")
	public List<Transaction> findAllByAccNoWhereStatusIsSuccess(long Accno, String status);
}
