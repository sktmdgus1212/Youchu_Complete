package com.example.Service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import com.example.Entity.Youtuber;

@Repository
public interface Youtuber_db {
	
	ArrayList<Youtuber> getList(String a) throws ClassNotFoundException, SQLException;
	
}