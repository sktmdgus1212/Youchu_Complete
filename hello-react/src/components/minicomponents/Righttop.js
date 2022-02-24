import React, {Component} from'react';


class Righttop extends Component{
    render(){
        const st = {
            width:'525px',
            height:'35px',
            border:'0.01px',
            borderStyle:'dashed',
            borderRadius:'50%',
            textAlign:'center',
            backgroundColor:'white'
            
        }
        
        
        return(
           <div style={st}>
               
               <h3> {this.props.tag}</h3>

           </div>

        );
    }
}

export default Righttop;