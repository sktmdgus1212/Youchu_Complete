package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.Entity.Youtuber;

@Service
public class JDBC_FindingTag {
	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "YOUCHU_DB"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	 
	
	public String findingTag(int tag_num) throws ClassNotFoundException, SQLException {
		//tag의 값에 따라 알맞은 값은 tag db에서 가져옴
		ArrayList<Youtuber> list = new ArrayList<>();

		String sql = "SELECT * FROM TAG WHERE cnt="+tag_num;
		String tag_name="default";
		Connection con = DriverManager.getConnection(url, uid, pwd);
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		if (rs.next()) {
			tag_name = rs.getString("tag_NAME");
		}
		
		rs.close();
		st.close();
		con.close();

		return tag_name;
	}
}