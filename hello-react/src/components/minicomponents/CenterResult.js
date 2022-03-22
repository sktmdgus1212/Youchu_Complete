import { render } from '@testing-library/react';
import React, {Component} from'react';

class CenterResult extends Component{
    render(){
        

          const st = {
            width: '390px',
            height:'390px',
            verticalAlign: 'middle',
          }
          const Site={
            width: '390px',
            height:'80px',
            verticalAlign: 'middle'
        }


        return(


            <div>
                <img  style={st}  src={this.props.image}></img>
                <div style = {Site}>{this.props.id} </div>
                <div style={Site}>{this.props.kor_name} </div>
                <div style={Site}>{this.props.tag} </div>
            </div>



        );
    }
}
export default CenterResult;