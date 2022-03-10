package com.example.Test;

import static org.junit.Assert.assertEquals;

import java.sql.SQLException;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import com.example.Service.DB_Info;
import com.example.Service.JDBC_IdToTag;
class IdToTag_Test {

	private DB_Info db_info;
	 
	public IdToTag_Test(DB_Info db_info) {
		this.db_info = db_info;
	}
	
	@Test
	void testFun_idtotag() throws SQLException {
		JDBC_IdToTag idtotag = new JDBC_IdToTag(db_info);
		ArrayList<Integer> list = new ArrayList<>();
		
		list.add(1);
		list.add(2);
		list.add(3);
		assertEquals(list, idtotag.fun_idtotag("gamst"));
	}

}
