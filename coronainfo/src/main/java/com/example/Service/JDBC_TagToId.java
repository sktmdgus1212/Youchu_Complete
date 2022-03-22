package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service
public class JDBC_TagToId {
	 private DB_Info db_info;
	 
		public JDBC_TagToId(DB_Info db_info) {
			this.db_info = db_info;
		}
	
	public int fun_tagtoid(String tag_name) throws SQLException{
		int cnt = 0;	
		String sql = "SELECT CNT FROM TAG WHERE TAG_NAME='"+tag_name+"'";

		Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		if (rs.next()) {
			cnt = rs.getInt("CNT");
		}
		
		rs.close();	
		con.close();

		return cnt;
		
	}
}
