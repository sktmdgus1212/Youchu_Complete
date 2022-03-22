import React, {Component} from 'react';
import axios from 'axios';
class Rightbottom extends Component{

    remove_tag_data(hidden){ 
        var searchingFile = hidden;
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/delete_tag',
              method: 'post',
              data: {
                tag: searchingFile
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
        <form onSubmit = {function(e){
            e.preventDefault();
            
            this.props.onSubmit(e.target.id.value);
            this.remove_tag_data(e.target.hidden.value);
        }.bind(this)}>
        <div><input type = "submit" name = "id" value = {this.props.tag} ></input></div>
        <input type = "hidden" name = "hidden" value = {this.props.cnt}></input>
        </form>


    );
    }
}


export default Rightbottom;