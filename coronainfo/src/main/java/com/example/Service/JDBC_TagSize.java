package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

@Service
public class JDBC_TagSize {
	 private DB_Info db_info;
	 
		public JDBC_TagSize(DB_Info db_info) {
			this.db_info = db_info;
		}
		
	public int find_tagsize() throws SQLException {
		String sql = "SELECT LAST_VALUE(CNT) OVER(ORDER BY CNT DESC) AS LAST_CNT FROM TAG";
		int size = 0;
		Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		if (rs.next()) {
			size = rs.getInt("LAST_CNT");
		}
		rs.close();
		st.close();
		con.close();

		return size;
	}
}
