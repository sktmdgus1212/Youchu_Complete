package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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

		public HashMap<String, JSONObject> recommend_result(int[][] list, int[] user_val, ArrayList<String> exec_list) throws ClassNotFoundException, SQLException {
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
			
			while (rs.next()) {
				String id = rs.getString("ID");
				String image = rs.getString("IMAGE");
				String tag_val = rs.getString("TAG");
				String kor_name = rs.getString("KOR_NAME");
				String id_num_val = rs.getString("ID_NUM");
				
				String str_Tag = jdbc_findingTag.findingTag(tag_val);
		
				
				Youtuber youtuber = new Youtuber(id, image, str_Tag, kor_name, id_num_val);

				result_youtuber.add(youtuber);
			}
			
			 HashMap<String, JSONObject> jsonall = new HashMap<>();
		      
		      for(int i = 0 ; i < result_youtuber.size() ; i++) {
		         String id = result_youtuber.get(i).id;	
		         if(jsonall.containsKey(id)) {

		            JSONObject exist_json = jsonall.get(id); //현재 존재하는 object 받기

		            JSONArray exist_jsonarr = (JSONArray) exist_json.get("tag"); //object안에 있는 array받기
		            exist_jsonarr.add(result_youtuber.get(i).tag); //array에 새로운 태그 값 추가
		            //System.out.print(exist_jsonarr);
		         }
		         else {
		         
		        	 
		        	JSONObject json = new JSONObject();
		            JSONArray jsonarray = new JSONArray();
		            
		            json.put("id", id);
		            json.put("image", result_youtuber.get(i).image);
		            jsonarray.add(result_youtuber.get(i).tag);
		            json.put("tag", jsonarray);
		            json.put("kor_name", result_youtuber.get(i).kor_name);
		            json.put("id_num", result_youtuber.get(i).id_num);
		            jsonall.put(id, json);            
		         }
		      }
		      
			rs.close();
			st.close();
			con.close();

			return jsonall;
		}
}
