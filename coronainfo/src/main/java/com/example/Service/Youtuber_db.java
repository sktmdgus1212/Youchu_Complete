package com.example.Service;

import java.sql.SQLException;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Repository;

import com.example.Entity.Youtuber;

@Repository
public interface Youtuber_db {
	
	HashMap<String, JSONObject> getList(String a) throws ClassNotFoundException, SQLException;
	
}