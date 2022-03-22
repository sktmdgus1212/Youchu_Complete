import React, {Component} from'react';
import axios from 'axios';

class Righttop extends Component{

    choose_tag_data(){ 
        var searchingFile = document.getElementById("choose_tag_data").value; 
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/choose_tag',
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
        {/*const st = {
            width:'525px',
            height:'35px',
            border:'0.01px',
            borderStyle:'dashed',
            borderRadius:'50%',
            textAlign:'center',
            backgroundColor:'white'
            
        }*/}
        
        
        return(
           <form onSubmit={ function(e){
            e.preventDefault();
                
                this.props.onSubmit(e.target.id.value); 
                this.choose_tag_data(e.target.id.value);
                
                
                }.bind(this)}>

                <div> <input  id = "choose_tag_data" name = "id" type = "submit"  value={this.props.id} ></input> </div>
           </form>
               
        

        );
    }
}

export default Righttop;