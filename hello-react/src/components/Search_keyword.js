import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 액시오스

function Test1() {


    function testAxios(){
        axios(
            {
              url: '/search_youtuber',
              method: 'post',
              data: {
                name='a'
              } , 
             
              baseURL: 'http://localhost:3000',
              //withCredentials: true,
            }
          ).then(function (response) {
            console.log(response.data)
            console.log(response.data.JavaData[0].NICKNAME)
          });


    }    

    return (
            <form onSubmit = { function(e) {
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
                <p> <button type = "submit" value = "검색" onClick={()=> testAxios()}></button></p>
              </form>
    );
  }


  export default Test1;  


  