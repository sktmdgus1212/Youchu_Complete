import React, {Component} from'react';
import axios from 'axios'; // 액시오스
class Result_Youtuber extends Component{

    receive_result_list(){
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/send_result',
              method: 'post',
              
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
              console.log(response.data)
          });
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
                 this.receive_result_list()
                }.bind(this)}></input>
            </section>
        );
    }
}

export default Result_Youtuber;