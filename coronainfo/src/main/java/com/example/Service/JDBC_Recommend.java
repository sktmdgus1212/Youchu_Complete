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
public class JDBC_Recommend {
	 private DB_Info db_info;
	 private JDBC_FindingTag jdbc_findingTag;
		public JDBC_Recommend(DB_Info db_info, JDBC_FindingTag jdbc_findingTag) {
			this.db_info = db_info;
			this.jdbc_findingTag = jdbc_findingTag;
		}

		public ArrayList<Youtuber> recommend_result(int[][] list, int[] user_val, ArrayList<String> exec_list) throws ClassNotFoundException, SQLException {
			ArrayList<Youtuber> result_youtuber = new ArrayList<>();
			int[] weight = new int[list.length];
			
			for(int i = 0 ; i < list.length ; i++) {
				int temp = 0;
				if(exec_list.contains(Integer.toString(i))) {
					weight[i] = -1;
					continue;
				}
				for(int j = 0 ; j < list[i].length ;j++) {
					temp += list[i][j] * user_val[j];
				}
				weight[i] = temp;
			}
			
			int max_val= -1;
			int max_index = -1;
			for(int i = 0 ; i < weight.length ; i++) {
				if(max_val < weight[i]) {
					max_index = i;
					max_val = weight[i];
				}
			}
			
			
			String sql = "SELECT * FROM YOUTUBER WHERE ID_NUM='"+max_index+"'";
			Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(sql);
			int id_num;
			int tag = 0;
			while (rs.next()) {
				String id = rs.getString("ID");
				String image = rs.getString("IMAGE");
				int tag_val = rs.getInt("TAG");
				String kor_name = rs.getString("KOR_NAME");
				String id_num_val = rs.getString("ID_NUM");
				
				String str_Tag = jdbc_findingTag.findingTag(tag_val);
		
				
				Youtuber youtuber = new Youtuber(id, image, str_Tag, kor_name, id_num_val);

				result_youtuber.add(youtuber);
			}
			
			rs.close();
			st.close();
			con.close();

			return result_youtuber;
		}
}
