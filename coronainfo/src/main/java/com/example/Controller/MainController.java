package com.example.Controller;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.Service.Youtuber_db;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MainController {

	private Youtuber_db youtuber_db;
	
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
	public Map<String,Object> search_youtuber(@RequestBody Map<String,Object> map) {
		String na = (String) map.get("name");
		System.out.print(na+"출력");
		return map;
	}  
}