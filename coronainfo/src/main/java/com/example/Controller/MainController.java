package com.example.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
	@GetMapping("/home")
    public String getHome(){
		//System.out.print("a");
        return "Hello World!";
    }
}