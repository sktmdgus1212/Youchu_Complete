import React, {Component} from'react';

class Result_Youtuber extends Component{
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
            </section>
        );
    }
}

export default Result_Youtuber;