import React, {Component} from'react';


class Lefttop extends Component{
    render(){
        const st = {
            width:'525px',
            height:'100px',
            backgroundColor:"white"
        }
        const Site={
            width: '100px',
            height:'100px',
            border:'0.01px',
            borderStyle:'dashed',
            float:'left'

        }
        const ExtendedSite={
            width: '325px',
            height:'100px',
            border:'0.01px',
            borderStyle:'dashed',
            float:'right'
        }
        
        return(
            
           <div style={st}>
               <div style={Site}><p>(사진넣기)</p></div>
                <div style={Site}><p><a href = ""  onClick = { function(e){
                    
                    e.preventDefault();
                    this.props.onChangePage(this.props.title)
                }.bind(this)}>{this.props.title}</a></p></div>
               
               <div style={ExtendedSite}><p>{this.props.tag}</p></div>

           </div>

        );
    }
}

export default Lefttop