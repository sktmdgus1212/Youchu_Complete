import React, {Component} from 'react';
import axios from 'axios';
class Leftbottom extends Component{


    remove_youtuber_data(hidden){ 
        var searchingFile = hidden;
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/delete_youtuber',
              method: 'post',
              data: {
                name: searchingFile
              }, 
              baseURL: 'http://localhost:8080'
              //withCredentials: true
            }
          ).then(function (response) {
            console.log(response.data)
          });
    }


    render(){
        
        const st = {
            width:'525px',
            height:'80px',
            backgroundColor:"white"
        }
        const Site={
            width: '90px',
            height:'90px',
            border:'0.001px',
            borderStyle:'solid',
            float:'left'
        }
     
        const ExtendedSite={
            width: '255px',
            height:'90px',
            border:'0.001px',
            borderStyle:'solid',
            float:'right'
        }

        
        
    
        return(
            
            <form   style = {st} onSubmit = {function(e){
                e.preventDefault();
                this.remove_youtuber_data(e.target.hidden.value);
                console.log(this);
                this.props.onSubmit(e.target.id.value);
                this.remove_youtuber_data();
            }.bind(this)}>
                
                <img  style={Site}  src={this.props.image}></img>
                <div style = {Site}> <input autocomplete="off"  style={{borderStyle:'none'}} id = "choose_data"  name = "id" type = "submit"  value={this.props.id} ></input> </div>
                <div style={Site}><input autocomplete="off" style={{borderStyle:'none'}} type="text" name = "kor_name" size='7' value = {this.props.kor_name} ></input></div>
                <div style={ExtendedSite}><input autocomplete="off" style={{borderStyle:'none'}} size='35' type="text" name = "tag" value = {this.props.tag} ></input></div>
                <input type = "hidden" name = "hidden" value = {this.props.id_num}></input>
            </form>
            

        );
    }
}


export default Leftbottom;