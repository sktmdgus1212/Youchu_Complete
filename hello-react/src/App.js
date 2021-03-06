import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Search_Youtuber from './components/Search_Youtuber';
import Search_Tag from './components/Search_Tag';
import Result_Youtuber from './components/Result_Youtuber';

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [ testStr, setTestStr ] = useState('');

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }
  
  // 첫 번째 렌더링을 마친 후 실행
  useEffect(
      () => {
        axios({
            url: '/home',
            method: 'GET'
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );
 
  return (
    <div  className="App">
      {testStr}
    <Search_Youtuber onSubmit = {function(_title){
              console.log(_title);
          }.bind(this)}></Search_Youtuber>
    <Result_Youtuber></Result_Youtuber>
    <Search_Tag onSubmit = {function(_tag){
        console.log(_tag);
    }.bind(this)}></Search_Tag>
   </div>
  );
}

export default App;