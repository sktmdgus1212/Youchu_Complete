import React, {Component} from 'react';

class Leftbottom extends Component{
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
          
            <div   style = {st}>
           
               
               
                <div style = {Site}> <p>{this.props.id} </p> </div>
                <div style={Site}><p>{this.props.kor_name} </p></div>
                
               
                <div style={ExtendedSite}><input style={{borderStyle:'none'}} type="text" name = "tag" value = {this.props.tag} ></input></div>

            </div>
            

        );
    }
}


export default Leftbottom;