import React, {Component} from'react';
import Righttop from './minicomponents/Righttop';
import axios from 'axios';
import Rightbottom from './minicomponents/Rightbottom';
class Search_Tag extends Component{
    constructor(props){
        super(props);
        this.state={
          searchedTagList:
          [
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''}
             
           ],

            searchedTagIndex:0,

            finalTagList:[
              {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''}
            ],

            finalTagIndex:0
        }
        this.transmit_tag_data=this.transmit_tag_data.bind(this);
        this.get_tag_Data=this.get_tag_Data.bind(this);
        this. add_finalTagList=this. add_finalTagList.bind(this);

    }
    
    
    
    
    transmit_tag_data(){ 
        var searchingFile = document.getElementById("tag_data").value; 
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/search_tag',
              method: 'post',
              data: {
                tag: searchingFile
              }, 
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
          });
    }
    
    get_tag_Data(){ 
    
        
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/searched_result_tag',
              method: 'post',
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
            return response.data;
            
          })
          .then(function(data){
            let key = Object.keys(data);
            console.log(key);
            let keys = Object.keys(data).length;
            console.log("키의 숫자는: " + keys);
            let values = Object.values(data);
            console.log("내용의 값은: " +values);

            let index=0;
            let shit = [
              {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''}
            ]

            for(let i=0;i<keys;i++, index++){
                    
                    shit[index].cnt=key[i];
                    shit[index].tag=values[i];
                    console.log(values[i]);
                    //console.log(this.state.searchedTagList[index].tag);

            }
                    
            
                this.setState({
                    searchedTagList: shit,
                    //searchedTagList: this.state.searchedTagList,
                    searchedTagIndex: index
                                        
                })
                console.log(this.state.searchedTagList);
            
          }.bind(this));    
          
    }
    
    add_finalTagList(cnt, tag){
       
        
        let i = this.state.finalTagIndex;
        console.log(i);


        this.state.finalTagList[i].cnt=cnt;
        this.state.finalTagList[i].tag=tag;

         
         
         this.setState({
           finalTagList: this.state.finalTagList,
           finalTagIndex:this.state.finalTagIndex+1
         })    

         

  }

  clear_searchedTagList(){
    this.setState({
        searchedTagList:[
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''},
             {cnt: '', tag: ''}
        ]})
  }
    
    
    render(){

        const rightSidebar= {
            width: '525px',   /* 사이드바의 너비 */
            height:'900px',  /* 사이드바의 높이 */
            backgroundColor:'white',
            float: 'left' , /* 왼쪽으로 플로팅 */
            position:'fixed',
            left: '970px'
          }
        const leftContainer1 = {
            height:'100px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',
            position:'static'
          }
        
        
          const leftContainer2 = {
            height:'400px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',
            position:'static'
          }



          const _lists = this.state.searchedTagList;
          const returnList = Object.values(_lists).map( list => {
            return(
              
              <Righttop 
              
                      cnt = {list.cnt}
                      tag={list.tag} 
                     
                      onSubmit ={ function(cnt,tag){
                            
                            this.add_finalTagList(cnt,tag);
                        
                        }.bind(this)} 
                ></Righttop> 
              
            );
          })



          const print_lists = this.state.finalTagList;
          const onRemove = tag => {
            
            const nextArray = print_lists.filter(list=> list.tag != tag);

            this.setState({
              finalTagList: nextArray,
              finalTagIndex:this.state.finalTagIndex-1
            })

          }

          const print_returnList = Object.values(print_lists).map( list => {
            return(
              <Rightbottom 
                cnt={list.cnt}
                tag={list.tag}
                 
                onSubmit = {function(_mola){
                        
                onRemove(_mola);
              }.bind(this)}></Rightbottom>
            );
          } 
          )


        return(
            <aside style = {rightSidebar}>
                <div style= {leftContainer1}>
                    <h2>영상 태그를 검색하세요.</h2>		
                    <form  onSubmit = { function(e) {
                                e.preventDefault();
                                this.props.onSubmit(
                                    e.target.title.value
                                );
                                this.transmit_tag_data();
                                this.get_tag_Data();
                                this.clear_searchedTagList();
                            }.bind(this)} >

                        <p><input 
                            autocomplete="off"
                            type ="text" 
                            name="title"
                            size="35" 
                            placeholder="태그를 검색하세요"
                            id="tag_data"
                            >
                            </input></p>
                        <p> <input autocomplete="off" type = "submit" value = "검색"></input></p>
                    </form>
                </div>
                <div style = {leftContainer2}>
                    <h2>관련 영상 태그 검색결과</h2>
                    {returnList}
                    
                </div>
				        <div style = {leftContainer2}><h2>내가 선택한 영상 태그 목록</h2>
                    {print_returnList}
                </div>	
            </aside>
        );
    }
}

export default Search_Tag;