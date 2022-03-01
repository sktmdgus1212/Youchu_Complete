package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class JDBC_InsertTag {
	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "USER1"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	 
	 public int insertTag(int tag) throws SQLException {
		 String sql = "INSERT INTO CHOOSE(TAG_NUM, TAG_CNT) VALUES (?, 1) "
		 		+ "ON DUPLICATE KEY UPDATE TAG_NUM=?, "
		 		+ "TAG_CNT=(SELECT NVL(MAX(A.TAG_CNT), 0)+1 from CHOOSE A)";

			Connection con = DriverManager.getConnection(url, uid, pwd);
			PreparedStatement  st = con.prepareStatement(sql);
			
			st.setInt(1, tag);
			st.setInt(2, tag);
			
			int result = st.executeUpdate();
			
			con.close();
			st.close();
			
			return result;
	 }
}
