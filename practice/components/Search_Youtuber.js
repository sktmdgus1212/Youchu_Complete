import React, {Component} from'react';
import Lefttop from './minicomponents/Lefttop';

class Search_Youtuber extends Component{
    
    render(){
        
        const leftSidebar= {
            width: '525px',   /* 사이드바의 너비 */
            height:'900px',  /* 사이드바의 높이 */
            backgroundColor:'#e9e9e9',
            float: 'left', /* 왼쪽으로 플로팅 */
            marginLeft:'40px'
          }
          const leftContainer1 = {
            height:'100px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',
          }
          const leftContainer2 = {
            height:'400px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin'
          }

          
        return(
            <aside style = {leftSidebar}>
                <div style= {leftContainer1}>
                    <h3>유투버를 검색하세요.</h3>		
                    <form action = "/search_youtuber" method = "post">
                        <input type ="text" size="35" placeholder="크리에이터 이름을 검색하세요"></input>
                        <input type = "button" value = "검색"></input>
                    </form>
                </div>
                <div style = {leftContainer2}><h3>유투버 검색결과</h3><Lefttop></Lefttop></div>
				<div style = {leftContainer2}><h3>내가 선택한 유투버 목록</h3></div>	
            
            </aside>
            
        );
    }
}

export default Search_Youtuber