package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC_FilterYoutuber {
	 private DB_Info db_info;
	 
		public JDBC_FilterYoutuber(DB_Info db_info) {
			this.db_info = db_info;
		}

		public int filtering(int[] tag_list) throws ClassNotFoundException, SQLException {

			String sql = "SELECT ID, TAG FROM YOUTUBER";
			Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);
			int tag_num;
			int result = 0;
			while (rs.next()) {
				tag_num = rs.getInt("TAG");
	
			}
			
			rs.close();
			st.close();
			con.close();

			return result;
		}
}
