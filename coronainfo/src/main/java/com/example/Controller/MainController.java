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
import com.example.Service.Youtuber_db;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MainController {

	private Youtuber_db youtuber_db;
	String search;
	@Autowired
	public MainController(Youtuber_db youtuber_db) {
		this.youtuber_db = youtuber_db;
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
		
		return "home";
	}
	
	@RequestMapping(value="/search_youtuber", method=RequestMethod.POST)
	public Map<String,Object> search_youtuber(@RequestBody Map<String,Object> map) throws ClassNotFoundException, SQLException {
		search = (String) map.get("name");
		return map;
	}  
	
	@ResponseBody
	   @RequestMapping(value="/searched_result_youtuber", method=RequestMethod.POST)
	   public HashMap<String, JSONObject> searched_result_youtuber() throws ClassNotFoundException, SQLException {
	      
	      ArrayList<Youtuber> youtuber = youtuber_db.getList(search);
	      HashMap<String, JSONObject> jsonall = new HashMap<>();
	      
	      for(int i = 0 ; i < youtuber.size() ; i++) {
	         String id = youtuber.get(i).id;
	         if(jsonall.containsKey(id)) {

	            JSONObject exist_json = jsonall.get(id); //현재 존재하는 object 받기

	            JSONArray exist_jsonarr = (JSONArray) exist_json.get("tag"); //object안에 있는 array받기
	            exist_jsonarr.add(youtuber.get(i).tag); //array에 새로운 태그 값 추가
	            System.out.print(exist_jsonarr);
	         }
	         else {
	         
	        	 
	        	JSONObject json = new JSONObject();
	            JSONArray jsonarray = new JSONArray();
	            
	            json.put("id", id);
	            json.put("image", youtuber.get(i).image);
	            jsonarray.add(youtuber.get(i).tag);
	            json.put("tag", jsonarray);
	            json.put("kor_name", youtuber.get(i).kor_name);
	            
	            jsonall.put(id, json);            
	         }
	      }
	            
	      return jsonall;
	   }
}