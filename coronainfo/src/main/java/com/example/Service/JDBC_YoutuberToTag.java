package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;


@Service
public class JDBC_YoutuberToTag {
	 private JDBC_InsertTag jdbc_insertTag;
	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "USER1"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	 
	 public JDBC_YoutuberToTag(JDBC_InsertTag jdbc_insertTag) {
		 this.jdbc_insertTag = jdbc_insertTag;
	 }
	 public void youtuberToTag(String choose_youtuber) throws SQLException{
		int tagnum;
		String sql = "SELECT TAG FROM YOUTUBER WHERE ID='"+choose_youtuber+"'";

		Connection con = DriverManager.getConnection(url, uid, pwd);
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);
		
		while(rs.next()) {
			tagnum = rs.getInt("TAG");
			jdbc_insertTag.insertTag(tagnum);
		}
		
		rs.close();
		st.close();
		con.close();
		
		return;
	 }
}