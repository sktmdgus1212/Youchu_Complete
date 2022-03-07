import React, {Component} from'react';
import axios from 'axios'; // 액시오스
import Leftbottom from './minicomponents/Leftbottom';
import Lefttop from './minicomponents/Lefttop';

class Search_Youtuber extends Component{
    constructor(props){
        super(props);
        this.state={
            lists: [],
            addedlist:[],
            x:null,
            finalIndex:0,

          finallist:[
            {image:'', kor_name: '', id:'', tag:[] },
            {image:'', kor_name: '', id:'', tag:[] },
            {image:'', kor_name: '', id:'', tag:[] },
            {image:'', kor_name: '', id:'', tag:[] },
            {image:'', kor_name: '', id:'', tag:[] },
          ],

            image:'',
            kor_name:'',
            id:'',
            tag:[]

        }
        this.ChangeMethod=this.ChangeMethod.bind(this);
        this.transmit_youtuber_data=this.transmit_youtuber_data.bind(this);
        this.getData=this.getData.bind(this);
       
    }

    ChangeMethod(name){
        this.state.addedlist=this.state.lists.concat(name+ " ");
        this.setState({
            lists:this.state.addedlist
         })
    }
    

    transmit_youtuber_data(){ 
        var searchingFile = document.getElementById("search_data").value; 
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/search_youtuber',
              method: 'post',
              data: {
                name: searchingFile
              }, 
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
          });
    }


    getData(){ 
        var _article = null;
        var imageList=[];
        var kor_nameList=[];
        var idList = [];
        var tagList=[];
        var _article = null;
        var baseUrl = "/img/";
        var result = {};

        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/searched_result_youtuber',
              method: 'post',
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
            return response.data;
            
          })
          .then(function(data){

            let keys = Object.keys(data).length;
            console.log("키의 숫자는: " + keys);
            let values = Object.values(data);
            let index=0;

            for(let i=0;i<keys;i++, index++){
              
                var newObject = new Object();

                    newObject.image=baseUrl+values[i].image;
                    this.state.finallist[index].image =baseUrl+values[i].image;
                    console.log(this.state.finallist[index].image);

                    newObject.kor_name=values[i].kor_name;
                    this.state.finallist[index].kor_name =values[i].kor_name;
                    console.log(this.state.finallist[index].kor_name);

                    newObject.id=values[i].id;
                    this.state.finallist[index].id=(values[i].id);
                    console.log(this.state.finallist[index].id);

                    newObject.tag=[];

                for (let j=0;j<values[i].tag.length;j++){
                   newObject.tag[j]=values[i].tag[j];

                   tagList.push(newObject.tag[j]);
                   this.state.finallist[index].tag = tagList

                   console.log(this.state.finallist[index].tag);
                } 
                tagList=[];

            }
            
                this.setState({
                    finallist: this.state.finallist,
                    finalIndex: index
                    
                })
                console.log(this.state.finallist);
                console.log(this.state.finalIndex);
          }.bind(this));    
          
    }

    return_youtuber_data(){
      const st = {
        width:'525px',
        height:'100px',
        backgroundColor:"white"
    }
    const Site={
        width: '100px',
        height:'100px',
        border:'0.01px',
        borderStyle:'dashed',
        float:'left'

    }
    const ExtendedSite={
        width: '325px',
        height:'100px',
        border:'0.01px',  
        borderStyle:'dashed',
        float:'right'
    }
    const rendering = () => {
      const result = [];
      for (let i = 0; i < this.state.finallist.length; i++) {
        result.push(<div style={st}>
          <img style={Site} src={this.state.finallist[i].image}></img>
          
           <div style={Site}><p><a href = ""  onClick = { function(e){
               
               e.preventDefault();
               this.props.onClick(this.props.id)
           }.bind(this)}>{this.state.finallist[i].id}</a></p></div>
          
          <div style={ExtendedSite}><p>{this.state.finallist[i].tag}</p></div>

       </div>
);
      }
      return result;
    };
        return(
          <div>
            {rendering()}
          </div>
       );
    }

    choose_youtuber_data(){ 
      var searchingFile = document.getElementById("choose_data").value; 
      axios(
          {
            headers: {"Content-Type": "application/json"},
            url: '/choose_youtuber',
            method: 'post',
            data: {
              name: searchingFile
            }, 
            baseURL: 'http://localhost:8080'
            //withCredentials: true
          }
        ).then(function (response) {
          console.log(response.data)
        });
  }
    render(){
      var _article = null;
      var num=0;
      var index = this.state.index;

     
  
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
                <form  onSubmit = { function(e) {
                                e.preventDefault();
                                this.props.onSubmit(
                                    e.target.title.value
                                );
                                this.transmit_youtuber_data();
                                this.getData();
                            }.bind(this)} >

                        <p><input type ="text" 
                            name="title"
                            size="35" 
                            placeholder="크리에이터 이름을 검색하세요"
                            id="search_data"
                            >
                            </input></p>
                        <p> <input type = "submit" value = "검색"></input></p>
                    </form>
                </div>


                <div style = {leftContainer2}>
                    <h2>유투버 검색결과</h2>
                              ㅇㅇ
                    {this.return_youtuber_data()}
      
                 
                </div>

				<div style = {leftContainer2}>
                    <h2>내가 선택한 유투버 목록</h2>
                    
                </div>	
            
            </aside>        
        ); 
  }
}
export default Search_Youtuber;