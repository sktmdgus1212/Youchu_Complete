package com.example.Service;

import org.springframework.stereotype.Service;

@Service
public class DB_Info {
	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "USER1"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	 
	 
}
