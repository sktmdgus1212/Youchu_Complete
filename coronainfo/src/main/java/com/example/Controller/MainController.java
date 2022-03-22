package com.example.Controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.Entity.Youtuber;
import com.example.Service.JDBC_FillMatrix;
import com.example.Service.JDBC_IdToTag;
import com.example.Service.JDBC_Recommend;
import com.example.Service.JDBC_TagService;
import com.example.Service.JDBC_TagSize;
import com.example.Service.JDBC_TagToId;
import com.example.Service.JDBC_YoutuberSize;
import com.example.Service.Youtuber_db;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MainController {

	private Youtuber_db youtuber_db;
	private JDBC_IdToTag idToTag;
	private JDBC_TagSize jdbc_TagSize;
	private JDBC_YoutuberSize jdbc_YoutuberSize;
	private JDBC_FillMatrix fillMatrix;
	private JDBC_Recommend jdbc_Recommend;
	private JDBC_TagService jdbc_TagService;
	private JDBC_TagToId jdbc_TagToId;
	int[] tag_list;
	int[][] youtuber_list;
	ArrayList<String> exec_list;
	String search;
	String tag;
	String choosed_youtuber_name;
	String choosed_tag_name;
	String delete_youtuber;
	String delete_tag;
	
	@Autowired
	public MainController(Youtuber_db youtuber_db, JDBC_IdToTag idToTag, JDBC_TagSize jdbc_TagSize, JDBC_YoutuberSize jdbc_YoutuberSize, JDBC_FillMatrix fillMatrix, JDBC_Recommend jdbc_Recommend, JDBC_TagService jdbc_TagService, JDBC_TagToId jdbc_TagToId) {
		this.youtuber_db = youtuber_db;
		this.idToTag = idToTag;
		this.jdbc_TagSize = jdbc_TagSize;
		this.jdbc_YoutuberSize = jdbc_YoutuberSize;
		this.fillMatrix = fillMatrix;
		this.jdbc_Recommend = jdbc_Recommend;
		this.jdbc_TagService = jdbc_TagService;
		this.jdbc_TagToId = jdbc_TagToId;
	}

	//시작 화면시 db 사이즈 추출
	@RequestMapping("/home")
	public String home() throws ClassNotFoundException, SQLException {
		int col = jdbc_YoutuberSize.find_youtubersize();
		int row = jdbc_TagSize.find_tagsize();
		youtuber_list = fillMatrix.fill_matrix(col, row);
		tag_list = new int[row+1];
		exec_list = new ArrayList<>();
		return "home";
	}
	
	//유튜버 검색
	@RequestMapping(value="/search_youtuber", method=RequestMethod.POST)
	public Map<String,Object> search_youtuber(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
		search = (String) map.get("name");
		return map;
	}  
	
	//태그 검색
	@RequestMapping(value="/search_tag", method=RequestMethod.POST)
	public Map<String,Object> search_tag(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
		tag = (String) map.get("tag");
		return map;
	} 
		
	//유튜버 선택
	@RequestMapping(value="/choose_youtuber", method=RequestMethod.POST)
	public Map<String,Object> choose_youtuber(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
		choosed_youtuber_name = (String) map.get("name");
		ArrayList<Integer> current_tag_list= idToTag.fun_idtotag(choosed_youtuber_name);

		for(int i = 0 ; i < current_tag_list.size() ;i++) {
			if(!exec_list.contains(choosed_youtuber_name)) {
				tag_list[current_tag_list.get(i)] += 1;
			}
		}
		exec_list.add(choosed_youtuber_name);
		return map;
	}  
	
	//태그 선택
		@RequestMapping(value="/choose_tag", method=RequestMethod.POST)
		public Map<String,Object> choose_tag(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
			choosed_tag_name = (String) map.get("tag");
			int current_tag_num =  Integer.parseInt(choosed_tag_name);
			tag_list[current_tag_num] += 1;
			
			return map;
		}  
		
		//유튜버 삭제
		@RequestMapping(value="/delete_youtuber", method=RequestMethod.POST)
		public Map<String,Object> delete_youtuber(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
			delete_youtuber = (String) map.get("name");
			ArrayList<Integer> current_tag_list= idToTag.fun_idtotag(delete_youtuber);
			
			for(int i = 0 ; i < current_tag_list.size() ;i++) {
					tag_list[current_tag_list.get(i)] -= 1;
				
			}
			return map;
		} 
		
		//태그 삭제
				@RequestMapping(value="/delete_tag", method=RequestMethod.POST)
				public Map<String,Object> delete_tag(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
					delete_tag = (String) map.get("tag");
					int current_tag_num= jdbc_TagToId.fun_tagtoid(delete_tag);
					
					tag_list[current_tag_num] -= 1;
					return map;
				} 
				
	//검색된 유튜버 결과 전송
	@ResponseBody
	   @RequestMapping(value="/searched_result_youtuber", method=RequestMethod.POST)
	   public HashMap<String, JSONObject> searched_result_youtuber() throws ClassNotFoundException, SQLException {
	      
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			HashMap<String, JSONObject> youtuber = youtuber_db.getList(search);
	      return youtuber;
	   }
	
	//검색된 태그 결과 전송
		@ResponseBody
		   @RequestMapping(value="/searched_result_tag", method=RequestMethod.POST)
		   public HashMap<String, JSONObject> searched_result_tag() throws ClassNotFoundException, SQLException {
		      
				try {
					Thread.sleep(10);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				
				JSONObject tag_list = jdbc_TagService.get_tag_list(tag);
		      return tag_list;
		   }
	
	//결과 전송
	@ResponseBody
	   @RequestMapping(value="/send_result", method=RequestMethod.POST)
	   public HashMap<String, JSONObject> send_result() throws ClassNotFoundException, SQLException {
	      HashMap<String, JSONObject> result = jdbc_Recommend.recommend_result(youtuber_list, tag_list, exec_list);
	      return result;
	   }
	
}