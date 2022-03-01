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
public class JDBC_YoutuberService implements Youtuber_db {

	 private JDBC_FindingTag jdbc_FindingTag;
	 private String url = "jdbc:oracle:thin:@localhost:1521/xepdb1"; 
	 private String uid = "USER1"; 
	 private String pwd = "1234"; 
	 private String driver = "oracle.jdbc.driver.OracleDriver";
	 
	public JDBC_YoutuberService(JDBC_FindingTag jdbc_FindingTag) {
		this.jdbc_FindingTag = jdbc_FindingTag;
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
	public ArrayList<Youtuber> getList(String search) throws ClassNotFoundException, SQLException {
		ArrayList<Youtuber> list = new ArrayList<>();	
		String sql = "SELECT * FROM YOUTUBER WHERE LOWER(id) LIKE LOWER('%"+search+"%') OR KOR_NAME LIKE '%"+search+"%'";

		Connection con = DriverManager.getConnection(url, uid, pwd);
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);

		while (rs.next()) {
			String id = rs.getString("ID");
			String image = rs.getString("IMAGE");
			int tag = rs.getInt("TAG");
			String kor_name = rs.getString("KOR_NAME");
		
			String str_Tag = jdbc_FindingTag.findingTag(tag);
	
			
			Youtuber youtuber = new Youtuber(id, image, str_Tag, kor_name);

			list.add(youtuber);

		}
		rs.close();
		st.close();
		con.close();

		return list;
	}
}