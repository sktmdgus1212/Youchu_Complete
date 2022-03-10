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
public class JDBC_IdToTag {

	 private DB_Info db_info;
	 
		public JDBC_IdToTag(DB_Info db_info) {
			this.db_info = db_info;
		}
	
	public ArrayList<Integer> fun_idtotag(String id) throws SQLException{
		ArrayList<Integer> list = new ArrayList<>();	
		String sql = "SELECT TAG FROM YOUTUBER WHERE id_num='"+id+"'";

		Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		while (rs.next()) {
			int tag = rs.getInt("TAG");
			list.add(tag);
		}
		
		rs.close();	
		st.close();
		con.close();

		return list;
		
	}
}
