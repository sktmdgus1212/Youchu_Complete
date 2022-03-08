import React, {Component} from'react';



class Lefttop extends Component{
    render(){
        
        const st = {
            width:'525px',
            height:'80px',
            backgroundColor:"white"
        }
        const Site={
            width: '80px',
            height:'80px',
            border:'0.01px',
            borderStyle:'dashed',
            float:'left'

        }
        const ExtendedSite={
            width: '285px',
            height:'80px',
            border:'0.01px',
            borderStyle:'dashed',
            float:'right'
        }
        
    
        return(
              
           <div style={st}>
               <img style={Site} src={this.props.image}></img>
               
                <div style={Site}><p><a href = ""  onClick = { function(e){
                    e.preventDefault();
                    this.props.onClick(this.props.id)
                    }.bind(this)}>{this.props.id}</a></p></div>
            <div style={Site}><p>{this.props.kor_name}</p></div>
                
               
               <div style={ExtendedSite}><p>{this.props.tag}</p></div>

            </div>

         
            

        );
    }
}

export default Lefttop;