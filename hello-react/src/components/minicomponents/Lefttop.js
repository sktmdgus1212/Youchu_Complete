import React, {Component} from'react';
import axios from 'axios'; // 액시오스

class Lefttop extends Component{

    choose_youtuber_data(){ 
        var searchingFile = document.getElementById("choose_data").value; 
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/choose_youtuber',
              method: 'post',
              data: {
                name: searchingFile
              }, 
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
          });
    }
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
                    console.log(this);
                    this.choose_youtuber_data();
                    }.bind(this)}>{this.props.id}</a></p></div>
                    
                <div style={Site}><p>{this.props.kor_name}</p></div>
                    
            <div style={Site}><p>{this.props.kor_name}</p></div>
                
               
               <div style={ExtendedSite}><p> {this.props.tag + ","}</p></div>

            </div>

         
            

        );
    }
}

export default Lefttop;