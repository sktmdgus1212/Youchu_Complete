import React, {Component} from'react';
import Righttop from './minicomponents/Righttop';
import axios from 'axios';
import Rightbottom from './minicomponents/Rightbottom';
import './Scroll.css';

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
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            backgroundColor:'white',
            float: 'left' , /* 왼쪽으로 플로팅 */
            position:'fixed',
            left: '970px'
          }
        const leftContainer1 = {
          height:'120px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            backgroundColor:'#E4E1E1',
            borderLeftWidth: '2px',
            borderRightWidth: '2px',
            borderTopWidth: '2px',
            position:'static'
          }
        
        
          const leftContainer2 = {
            height:'400px',
            display: 'block',
            borderStyle: 'solid',
            borderWidth: 'thin',  
            marginBottom: '10px',
            borderLeftWidth: '2px',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
            overflow:'auto',
            position:'static'
          }

          const buttonStyle = {
            width:'50px',
            marginTop:'10px',
            fontSize: '15px',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF'
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
                    <h2 style={{
                  textAlign: 'center',
                  }
                }>관심있는 해쉬태그</h2>		
                    <form  onSubmit = { function(e) {
                                e.preventDefault();
                                this.props.onSubmit(
                                    e.target.title.value
                                );
                                this.transmit_tag_data();
                                this.get_tag_Data();
                                this.clear_searchedTagList();
                            }.bind(this)} >


                        <p style={{
                          textAlign: 'center'}
                        }><input 
                            autocomplete="off"
                            type ="text" 
                            name="title"
                            size="35" 
                            placeholder="해쉬태그 검색"
                            id="tag_data"
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
                }> <input autocomplete="off" type = "submit" value = "검색" style={buttonStyle}></input></p>
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
                 <div style = {leftContainer2}>
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
                }>내가 고른 태그</h2>
                <div style = {leftContainer2}>
                    {print_returnList}
                </div>	
            </aside>
        );
    }
}

export default Search_Tag;