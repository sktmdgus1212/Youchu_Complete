package com.example.Controller;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Entity.Youtuber;
import com.example.Service.Youtuber_db;

@Controller
public class MainController {

	private Youtuber_db youtuber_db;
	
	@Autowired
	public MainController(Youtuber_db youtuber_db) {
		this.youtuber_db = youtuber_db;
	}


	@RequestMapping("/home")
	public String home(@RequestParam(name="searching_youtuber", defaultValue = "1") String search, Model model) throws ClassNotFoundException, SQLException {
		ArrayList<Youtuber> youtuber = youtuber_db.getList(search); // data 가져오기
		
		if(youtuber.isEmpty()) {
			model.addAttribute("youtuber_id", "nothing"); // data가 없을 때 nothing 집어넣음
		}
		else {
			model.addAttribute("youtuber_id", youtuber.get(0).id);
			model.addAttribute("youtuber_image", youtuber.get(0).image);
			model.addAttribute("youtuber_kor_name",youtuber.get(0).kor_name);
			model.addAttribute("youtuber", youtuber);
		}
		
		return "home";
	}

}