package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

@Service
public class JDBC_FillMatrix {
	 private DB_Info db_info;
	 
		public JDBC_FillMatrix(DB_Info db_info) {
			this.db_info = db_info;
		}

		public int[][] fill_matrix(int col, int row) throws ClassNotFoundException, SQLException {
			int[][] filled_list = new int[col+1][row+1];
			String sql = "SELECT ID_NUM, TAG FROM YOUTUBER";
			Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);
			int id_num;
			int tag = 0;
			while (rs.next()) {
				id_num = rs.getInt("ID_NUM");
				tag = rs.getInt("TAG");
				filled_list[id_num][tag] = 1;
			}
			
			rs.close();
			st.close();
			con.close();

			return filled_list;
		}
}
