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
import com.example.Service.JDBC_TagSize;
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
	int[] tag_list;
	int[][] youtuber_list;
	ArrayList<String> exec_list;
	String search;
	String choosed_youtuber_name;
	@Autowired
	public MainController(Youtuber_db youtuber_db, JDBC_IdToTag idToTag, JDBC_TagSize jdbc_TagSize, JDBC_YoutuberSize jdbc_YoutuberSize, JDBC_FillMatrix fillMatrix, JDBC_Recommend jdbc_Recommend) {
		this.youtuber_db = youtuber_db;
		this.idToTag = idToTag;
		this.jdbc_TagSize = jdbc_TagSize;
		this.jdbc_YoutuberSize = jdbc_YoutuberSize;
		this.fillMatrix = fillMatrix;
		this.jdbc_Recommend = jdbc_Recommend;
	}

	/*
	 * @RequestMapping("/home") public String
	 * home(@RequestParam(name="searching_youtuber", defaultValue = "gamst") String
	 * search, Model model) throws ClassNotFoundException, SQLException {
	 * ArrayList<Youtuber> youtuber = youtuber_db.getList(search); // data 가져오기
	 * 
	 * 
	 * if(youtuber.isEmpty()) { model.addAttribute("youtuber_id", "nothing"); //
	 * data가 없을 때 nothing 집어넣음 } else { model.addAttribute("youtuber_id",
	 * youtuber.get(0).id); model.addAttribute("youtuber_image",
	 * youtuber.get(0).image);
	 * model.addAttribute("youtuber_kor_name",youtuber.get(0).kor_name);
	 * model.addAttribute("youtuber", youtuber); } return "home"; }
	 */

	@RequestMapping("/home")
	public String home() throws ClassNotFoundException, SQLException {
		int col = jdbc_YoutuberSize.find_youtubersize();
		int row = jdbc_TagSize.find_tagsize();
		System.out.print(col+" "+row);
		youtuber_list = fillMatrix.fill_matrix(col, row);
		tag_list = new int[row+1];
		exec_list = new ArrayList<>();
		return "home";
	}
	
	@RequestMapping(value="/search_youtuber", method=RequestMethod.POST)
	public Map<String,Object> search_youtuber(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
		search = (String) map.get("name");
		return map;
	}  
	
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
	
	@ResponseBody
	   @RequestMapping(value="/searched_result_youtuber", method=RequestMethod.POST)
	   public HashMap<String, JSONObject> searched_result_youtuber() throws ClassNotFoundException, SQLException {
	      
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	      ArrayList<Youtuber> youtuber = youtuber_db.getList(search);
	      HashMap<String, JSONObject> jsonall = new HashMap<>();
	      
	      for(int i = 0 ; i < youtuber.size() ; i++) {
	         String id = youtuber.get(i).id;
	         if(jsonall.containsKey(id)) {

	            JSONObject exist_json = jsonall.get(id); //현재 존재하는 object 받기

	            JSONArray exist_jsonarr = (JSONArray) exist_json.get("tag"); //object안에 있는 array받기
	            exist_jsonarr.add(youtuber.get(i).tag); //array에 새로운 태그 값 추가
	            //System.out.print(exist_jsonarr);
	         }
	         else {
	         
	        	 
	        	JSONObject json = new JSONObject();
	            JSONArray jsonarray = new JSONArray();
	            
	            json.put("id", id);
	            json.put("image", youtuber.get(i).image);
	            jsonarray.add(youtuber.get(i).tag);
	            json.put("tag", jsonarray);
	            json.put("kor_name", youtuber.get(i).kor_name);
	            json.put("id_num", youtuber.get(i).id_num);
	            jsonall.put(id, json);            
	         }
	      }
	            
	      return jsonall;
	   }
	
	@ResponseBody
	   @RequestMapping(value="/send_result", method=RequestMethod.POST)
	   public HashMap<String, JSONObject> send_result() throws ClassNotFoundException, SQLException {
	      System.out.print("response");
	      ArrayList<Youtuber> result = jdbc_Recommend.recommend_result(youtuber_list, tag_list, exec_list);
	      HashMap<String, JSONObject> jsonall = new HashMap<>();
	      
	      for(int i = 0 ; i < result.size() ; i++) {
	         String id = result.get(i).id;	
	         if(jsonall.containsKey(id)) {

	            JSONObject exist_json = jsonall.get(id); //현재 존재하는 object 받기

	            JSONArray exist_jsonarr = (JSONArray) exist_json.get("tag"); //object안에 있는 array받기
	            exist_jsonarr.add(result.get(i).tag); //array에 새로운 태그 값 추가
	            //System.out.print(exist_jsonarr);
	         }
	         else {
	         
	        	 
	        	JSONObject json = new JSONObject();
	            JSONArray jsonarray = new JSONArray();
	            
	            json.put("id", id);
	            json.put("image", result.get(i).image);
	            jsonarray.add(result.get(i).tag);
	            json.put("tag", jsonarray);
	            json.put("kor_name", result.get(i).kor_name);
	            json.put("id_num", result.get(i).id_num);
	            jsonall.put(id, json);            
	         }
	      }
	            
	      return jsonall;
	   }
	
}