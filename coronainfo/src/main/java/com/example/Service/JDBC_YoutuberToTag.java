package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class JDBC_YoutuberToTag {

	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "USER1"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	 
	 public ArrayList<Integer> youtuberToTag(String choose_youtuber) throws SQLException{
		ArrayList<Integer> tagnum_list = new ArrayList<>();
		String sql = "SELECT TAG FROM YOUTUBER WHERE ID='"+choose_youtuber+"'";

		Connection con = DriverManager.getConnection(url, uid, pwd);
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);
		
		while(rs.next()) {
			tagnum_list.add(rs.getInt("TAG"));
		}
		
		return tagnum_list;
	 }
}