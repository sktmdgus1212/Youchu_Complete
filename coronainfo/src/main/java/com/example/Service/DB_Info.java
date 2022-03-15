package com.example.Service;

import org.springframework.stereotype.Service;

@Service
public class DB_Info {
	 private static final String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private static final String uid = "USER1"; 
	 private static final String pwd = "1234"; 
	 private static final String driver = "oracle.jdbc.driver.OracleDriver";
	 
	
	public String getUrl() {
		return url;
	}
	
	public String getUid() {
		return uid;
	}

	public String getPwd() {
		return pwd;
	}

	public String getDriver() {
		return driver;
	}
	

	 
	 
}
