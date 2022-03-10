import React, {Component} from 'react';

class Leftbottom extends Component{
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
            
            <div   style = {st}>
                <img  style={Site}  src={this.props.image}></img>
                <div style = {Site}> <input  id = "choose_data" style={{borderStyle:'none'}} name = "id" type = "text"  value={this.props.id} ></input> </div>
                <div style={Site}><input style={{borderStyle:'none'}} type="text" name = "kor_name" value = {this.props.kor_name} ></input></div>
                <div style={ExtendedSite}><input style={{borderStyle:'none'}} size='35' type="text" name = "tag" value = {this.props.tag} ></input></div>

            </div>
            

        );
    }
}


export default Leftbottom;