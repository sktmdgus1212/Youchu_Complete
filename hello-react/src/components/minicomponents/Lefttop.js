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
              
            <form   style = {st} onSubmit={ function(e){
                e.preventDefault();
                console.log(e.target);
                //this.props.onSubmit(e);
                this.choose_youtuber_data();
                
                }.bind(this)} >
           
               <img style={Site} src={this.props.image}></img>
               
                <div style = {Site}><input  id = "choose_data" type = "submit" value={this.props.id} ></input> </div>
                <div style={Site}><p>{this.props.kor_name}</p></div>
                
               
                <div style={ExtendedSite}><p>{this.props.tag}</p></div>

            </form>
        );
    }
}

export default Lefttop;