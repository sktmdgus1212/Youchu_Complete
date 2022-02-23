import './App.css';
import React, {Component} from 'react';
import Search_Youtuber from './components/Search_Youtuber';
import Search_Tag from './components/Search_Tag';

class App extends Component {
  
  render(){
    const contents= {
      width: '475px',  /* 본문의 너비 */
      height:'900px',   /* 본문의 높이 */
      backgroundColor:'#f7f7f7',
      float: 'left',  /* 왼쪽으로 플로팅 */
    }
    
    return(
        <div className="App">

          <Search_Youtuber></Search_Youtuber>
          <section style={contents}>
				    <h2>유투버 추천 결과</h2>
      		</section>
          <Search_Tag></Search_Tag>




        </div>
      );

  }
}
export default App;
