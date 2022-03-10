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
public class JDBC_YoutuberSize {
	 private DB_Info db_info;
	 
		public JDBC_YoutuberSize(DB_Info db_info) {
			this.db_info = db_info;
		}

		public int find_youtubersize() throws ClassNotFoundException, SQLException {
			int size = 0;
			String sql = "SELECT LAST_VALUE(ID_NUM) OVER(ORDER BY ID_NUM DESC) AS LAST_NUM FROM YOUTUBER";
			String tag_name="default";
			Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);

			if (rs.next()) {
				size = rs.getInt("LAST_NUM");
			}
			
			rs.close();
			st.close();
			con.close();

			return size;
		}
}
