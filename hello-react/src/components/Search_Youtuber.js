import React, {Component} from'react';
import axios from 'axios'; // 액시오스
import Leftbottom from './minicomponents/Leftbottom';
import Lefttop from './minicomponents/Lefttop';
import { clear } from '@testing-library/user-event/dist/clear';

class Search_Youtuber extends Component{
    constructor(props){
        super(props);
        this.state={
            lists: [],
            addedlist:[],
            x:null,
            finalIndex:0,
            final_return_index:0,

          finallist:[
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
          ],

          final_return_list:[
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},
            {image:'/img/white.png', kor_name: '', id:'', tag:[] , id_num:''},  
            
          ],

            image:'',
            kor_name:'',
            id:'',
            tag:[],
            id_num:''
        }
        
        this.transmit_youtuber_data=this.transmit_youtuber_data.bind(this);
        this.getData=this.getData.bind(this);
        this.add_final_list=this.add_final_list.bind(this);
       
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
        
        var tagList=[];
        var baseUrl = "/img/";
        

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

                    newObject.id_num=values[i].id_num;
                    this.state.finallist[index].id_num=(values[i].id_num);
                    console.log(this.state.finallist[index].id_num);

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

    add_final_list(image,id,kor_name,tag,id_num){
          console.log(image);
          console.log(id);
          console.log(kor_name);
          console.log(tag);
          let i = this.state.final_return_index;

          this.state.final_return_list[i].image=image;
          this.state.final_return_list[i].id = id;
          this.state.final_return_list[i].kor_name = kor_name;
          this.state.final_return_list[i].tag = tag;
          this.state.final_return_list[i].id_num=id_num;
           
           
           this.setState({
             final_return_list: this.state.final_return_list,
             final_return_index:this.state.final_return_index+1
           })    

           

    }

clear_finallist(){
  this.setState({finallist:[
    {image:'/img/white.png', kor_name: '', id:'', tag:[], id_num:''},
    {image:'/img/white.png', kor_name: '', id:'', tag:[], id_num:'' },
    {image:'/img/white.png', kor_name: '', id:'', tag:[], id_num:'' },
    {image:'/img/white.png', kor_name: '', id:'', tag:[], id_num:'' },
    {image:'/img/white.png', kor_name: '', id:'', tag:[], id_num:'' },
    
  ] })
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
      var return_final_list=null;
     
  
        const leftSidebar= {
            width: '525px',   /* 사이드바의 너비 */
            height:'900px',  /* 사이드바의 높이 */
            float: 'left', /* 왼쪽으로 플로팅 */
            marginLeft:'40px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }
          const leftContainer1 = {
            height:'120px',
            display: 'block',
            borderStyle: 'solid',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderWidth: 'thin',
            backgroundColor:'#E4E1E1',
            borderLeftWidth: '2px',
            borderRightWidth: '2px',
            borderTopWidth: '2px',
         }

          const leftContainer2 = {
            height:'400px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',
            overflow:'auto',
            marginBottom: '10px',
            borderLeftWidth: '2px',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
          }
          


          const buttonStyle = {
            width:'50px',
            marginTop:'10px',
            fontSize: '15px',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF'
          }
        const _lists = this.state.finallist;
          const returnList = Object.values(_lists).map( list => {
            return(
              
              <Lefttop 
              
                    image = {list.image} 
                      id={list.id} 
                      kor_name={list.kor_name} 
                      tag={list.tag} 
                      id_num={list.id_num}
                      onSubmit ={ function(image,id, kor_name,tag,id_num){
                         
                        this.add_final_list(image,id,kor_name,tag,id_num);
                        
                        }.bind(this)} 
                         ></Lefttop> 
              
            );
          })


          const print_lists = this.state.final_return_list;
          const onRemove = id => {
            const nextArray = print_lists.filter(list=>list.id != id);
            
           
            this.setState({
              final_return_list: nextArray,
              final_return_index:this.state.final_return_index-1
            })
          }

         
          const print_returnList = Object.values(print_lists).map( list => {
            return(
              <Leftbottom 
              
                      image = {list.image} 
                      id={list.id} 
                      kor_name={list.kor_name} 
                      tag={list.tag} 
                      id_num={list.id_num}
                      onSubmit = {function(_mola){
                        
                        onRemove(_mola);
                      }.bind(this)}
                         ></Leftbottom> 
            );
          } 
          )

        return(
            <aside style = {leftSidebar} >{/*onSubmit = >*/}

                <div style= {leftContainer1}>
                <h2 style={{
                  textAlign: 'center',
                     }
                }>좋아하는 유튜버 찾기</h2>		
                <form  onSubmit = { function(e) {
                                e.preventDefault();
                                this.props.onSubmit(
                                    e.target.title.value
                                    
                                );
                                this.transmit_youtuber_data();
                                this.getData();
                                this.clear_finallist();
                            }.bind(this)} >

                        <p style={{
                  textAlign: 'center'}
                }><input type ="text" 
                            name="title"
                            size="35" 
                            placeholder="유튜버 검색"
                            id="search_data"
                            style={{
                              textAlign: 'center',
                            borderRadius: '50px',
                            height: '30px',
                          marginTop: '10px',}
                            }
                            >
                            </input></p>
                        <p style={{
                  textAlign: 'center'}
                }> <input type = "submit" value = "검색" style={buttonStyle}></input></p>
                    </form>
                </div>


                
                    <h2 style={{
                  textAlign: 'center',
                  borderStyle: 'solid',
                  borderWidth: 'thin',
                  backgroundColor:'#E4E1E1',
                  borderLeftWidth: '2px',
                  borderRightWidth: '2px', 
                  padding: '10px' 
                }
                }>검색 결과</h2>
                  <div className="scroll_css" style = {leftContainer2} >
                    {returnList}
                </div>
                    
                    <h2 style={{
                  textAlign: 'center',
                  borderStyle: 'solid',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  borderWidth: 'thin',
                  backgroundColor:'#E4E1E1',
                  borderLeftWidth: '2px',
                  borderRightWidth: '2px',
                  borderTopWidth: '2px',
                padding: '10px'}
                }>내가 고른 유튜버</h2>
                    <div style = {leftContainer2} className="scroll_css">
                      {print_returnList}
                      </div>
            </aside>        
        ); 
  }
}
export default Search_Youtuber;