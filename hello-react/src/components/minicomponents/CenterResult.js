import { render } from '@testing-library/react';
import React, {Component} from'react';

class CenterResult extends Component{
    render(){
        

          const st = {
            width: '390px',
            height:'390px',
            verticalAlign: 'middle',
            padding:'45px',
            
          }
          const Site={
            width: '390px',
            height:'80px',
            verticalAlign: 'middle',
            textAlign:"center",
            fontSize:'30px',
        }



        return(


            <div>
                <img  style={st}  src={this.props.image}></img>
                <div style = {Site}><b>{this.props.id}</b> </div>
                <div style={Site}><b>{this.props.kor_name}</b> </div>
                <div style={Site}><b>{this.props.tag}</b> </div>
            </div>



        );
    }
}
export default CenterResult;