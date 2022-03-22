import React, {Component} from'react';
import axios from 'axios'; // 액시오스
class Result_Youtuber extends Component{

    constructor(props){
        super(props);
        this.state={
            finalIndex:0,
            result_YoutuberList:[
                {image:'', kor_name: '', id:'', tag:[] , id_num:''},
                {image:'', kor_name: '', id:'', tag:[] , id_num:''},
                {image:'', kor_name: '', id:'', tag:[] , id_num:''},
                {image:'', kor_name: '', id:'', tag:[] , id_num:''},
                {image:'', kor_name: '', id:'', tag:[] , id_num:''},
              ]
        }


    }



    receive_result_list(){
        var tagList=[];
        var baseUrl = "/img/"
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/send_result',
              method: 'post',
              
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
            return response.data;
            
        }).then(function(data){
             
            let keys = Object.keys(data).length;
            console.log("키의 숫자는: " + keys);
            let values = Object.values(data);
            
            let index=0;

            for(let i=0;i<keys;i++, index++){
              
                var newObject = new Object();

                    newObject.image= baseUrl+values[i].image;
                    this.state.result_YoutuberList[index].image =baseUrl+values[i].image;
                    console.log(this.state.result_YoutuberList[index].image);

                    newObject.kor_name=values[i].kor_name;
                    this.state.result_YoutuberList[index].kor_name =values[i].kor_name;
                    console.log(this.state.result_YoutuberList[index].kor_name);

                    newObject.id=values[i].id;
                    this.state.result_YoutuberList[index].id=(values[i].id);
                    console.log(this.state.result_YoutuberList[index].id);

                    newObject.id_num=values[i].id_num;
                    this.state.result_YoutuberList[index].id_num=(values[i].id_num);
                    console.log(this.state.result_YoutuberList[index].id_num);

                    newObject.tag=[];

                for (let j=0;j<values[i].tag.length;j++){
                   newObject.tag[j]=values[i].tag[j];

                   tagList.push(newObject.tag[j]);
                   this.state.result_YoutuberList=[];[index].tag = tagList

                   console.log(this.state.result_YoutuberList[index].tag);
                } 
                tagList=[];

            }
            
                this.setState({
                    result_YoutuberList: this.state.result_YoutuberList,
                    finalIndex: index
                    
                })
                console.log(this.state.finallist);
                console.log(this.state.finalIndex);
          }.bind(this));    
          
    }


    render(){

        const middle_space= {
            width: '390px',  /* 본문의 너비 */
            height:'900px',   /* 본문의 높이 */
            backgroundColor: '#f7f7f7',
            float: 'left'  /* 왼쪽으로 플로팅 */
          }

        return(
            <section style = {middle_space}> 
                <h2>유투버 추천 결과</h2>
                <input type = "button" value = "결과 확인하기" onClick = {function (){
                 //함수넣기;
                 this.receive_result_list()
                }.bind(this)}></input>








            </section>
        );
    }
}

export default Result_Youtuber;