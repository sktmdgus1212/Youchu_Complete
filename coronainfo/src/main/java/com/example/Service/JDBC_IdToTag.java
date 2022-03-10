package com.example.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.Entity.Youtuber;

@Service
public class JDBC_IdToTag {

   private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
   private String uid = "USER1"; 
   private String pwd = "1234"; 
   private String driver = "oracle.jdbc.driver.OracleDriver";
   
   public ArrayList<Integer> fun_idtotag(String id) throws SQLException{
      ArrayList<Integer> list = new ArrayList<>();   
      String sql = "SELECT TAG FROM YOUTUBER WHERE id='"+id+"'";

      Connection con = DriverManager.getConnection(url, uid, pwd);
      Statement st = con.createStatement();
      ResultSet rs = st.executeQuery(sql);

      while (rs.next()) {
         int tag = rs.getInt("TAG");
         list.add(tag);
      }
      
      rs.close();   
      st.close();
      con.close();

      return list;
      
   }
}