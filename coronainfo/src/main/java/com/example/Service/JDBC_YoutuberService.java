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
public class JDBC_YoutuberService implements Youtuber_db {

	 private JDBC_FindingTag jdbc_FindingTag;
	 private DB_Info db_info;
	 
	 
	public JDBC_YoutuberService(JDBC_FindingTag jdbc_FindingTag, DB_Info db_Info) {
		this.jdbc_FindingTag = jdbc_FindingTag;
		this.db_info = db_Info;
	}

	/*
		 * DataSource dataSource;
		 * 
		 * @Autowired public JDBC_YoutuberService(DataSource dataSource) {
		 * this.dataSource = dataSource; }
		 * 
		 * public void setDataSource(DataSource dataSource) { this.dataSource =
		 * dataSource; }
		 */
	public HashMap<String, JSONObject> getList(String search) throws ClassNotFoundException, SQLException {
		ArrayList<Youtuber> list = new ArrayList<>();	
		String sql = "SELECT * FROM YOUTUBER WHERE LOWER(id) LIKE LOWER('%"+search+"%') OR KOR_NAME LIKE '%"+search+"%'";

		Connection con = DriverManager.getConnection(db_info.getUrl(), db_info.getUid(), db_info.getPwd());
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		while (rs.next()) {
			String id = rs.getString("ID");
			String image = rs.getString("IMAGE");
			String tag = rs.getString("TAG");
			String kor_name = rs.getString("KOR_NAME");
			String id_num = rs.getString("ID_NUM");
			
			String str_Tag = jdbc_FindingTag.findingTag(tag);
	
			
			Youtuber youtuber = new Youtuber(id, image, str_Tag, kor_name, id_num);

			list.add(youtuber);

		}
		
		 HashMap<String, JSONObject> jsonall = new HashMap<>();
	      
	      for(int i = 0 ; i < list.size() ; i++) {
	         String id = list.get(i).id;
	         if(jsonall.containsKey(id)) {

	            JSONObject exist_json = jsonall.get(id); //현재 존재하는 object 받기

	            JSONArray exist_jsonarr = (JSONArray) exist_json.get("tag"); //object안에 있는 array받기
	            exist_jsonarr.add(list.get(i).tag); //array에 새로운 태그 값 추가
	            //System.out.print(exist_jsonarr);
	         }
	         else {
	         
	        	 
	        	JSONObject json = new JSONObject();
	            JSONArray jsonarray = new JSONArray();
	            
	            json.put("id", id);
	            json.put("image", list.get(i).image);
	            jsonarray.add(list.get(i).tag);
	            json.put("tag", jsonarray);
	            json.put("kor_name", list.get(i).kor_name);
	            json.put("id_num", list.get(i).id_num);
	            jsonall.put(id, json);            
	         }
	      }
	      
		rs.close();
		st.close();
		con.close();

		return jsonall;
	}
}