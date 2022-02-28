import React, {Component} from'react';
import Leftbottom from './minicomponents/Leftbottom';
import Lefttop from './minicomponents/Lefttop';

class Search_Youtuber extends Component{
    constructor(props){
        super(props);
        this.state={
            lists: ["현재 선택한 유투버들은 "]
        }
    }
    
    render(){

        var count=1;
        var _list=[];
        
        const leftSidebar= {
            width: '525px',   /* 사이드바의 너비 */
            height:'900px',  /* 사이드바의 높이 */
            backgroundColor:'#e9e9e9',
            float: 'left', /* 왼쪽으로 플로팅 */
            marginLeft:'40px',
            
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
            borderWidth: 'thin',
            overflow:'auto',
            
          }
         

          
        return(
            <aside style = {leftSidebar}>
                <div style= {leftContainer1}>
                <h2>유투버를 검색하세요.</h2>		
                <form action = "/search_youtuber" 
                            method = "post"
                            onSubmit = { function(e) {
                                e.preventDefault();
                                this.props.onSubmit(
                                    e.target.title.value
                                );
                                alert('Submit!');
                            }.bind(this)} >
                        <p><input type ="text" 
                            name="title"
                            size="35" 
                            placeholder="크리에이터 이름을 검색하세요">
                            </input></p>
                        <p> <input type = "submit" value = "검색"></input></p>
                    </form>
                </div>
                <div style = {leftContainer2}>
                    <h2>유투버 검색결과</h2>

                    <Lefttop 
                        title= "감스트" 
                        tag = "피파, 롤, 개그" 
                        onChangePage = { function(name){
                            _list=this.state.lists.concat(name+",  ")
                            this.setState({
                                lists:_list
                             })
                    }.bind(this)}>    
                    </Lefttop>
                    
                    <Lefttop 
                        title= "정형구tv" 
                        tag = "이산수학, 프로그래밍언어론" 
                        onChangePage = { function(name){
                            _list=this.state.lists.concat(name+",  ")
                            this.setState({
                                lists:_list
                             })
                    }.bind(this)}>    
                    </Lefttop>

                    <Lefttop 
                        title= "김진석tv" 
                        tag = "컴퓨터알고리즘, 인터넷프로그래밍" 
                        onChangePage = { function(name){
                            _list=this.state.lists.concat(name+",  ")
                            this.setState({
                                lists:_list
                             })
                    }.bind(this)}>    
                    </Lefttop>

                    <Lefttop 
                        title= "이병정tv" 
                        tag = "소프트웨어공학, 객체지향프로그래밍" 
                        onChangePage = { function(name){
                            _list=this.state.lists.concat(name+"  입니다.")
                            this.setState({
                                lists:_list
                             })
                    }.bind(this)}>    
                    </Lefttop>
                    
                    
                    
                    
                </div>
				<div style = {leftContainer2}>
                    <h2>내가 선택한 유투버 목록</h2>
                    {this.state.lists}
                    
                    
                    
                </div>	
            
            </aside>
            
        );
    }
}

export default Search_Youtuber