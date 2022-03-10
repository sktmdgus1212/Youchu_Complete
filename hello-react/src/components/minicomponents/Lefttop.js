import React, {Component} from'react';
import axios from 'axios'; // 액시오스

class Lefttop extends Component{

state={ doubleSubmitFlag:false }
        


    choose_youtuber_data(id){ 
        var searchingFile = id;
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
              console.log(searchingFile)
          });
    }


 doubleSubmitCheck(){
     
        if(this.state.doubleSubmitFlag){
            return this.state.doubleSubmitFlag;
        }else{
            this.setState({doubleSubmitFlag :true})
            return false;
        }
    }
 
     insert(){
        if(this.doubleSubmitCheck()) return;
 
        alert("아래에 추가합니다!");
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
                
                this.insert();
                e.preventDefault();
                
                this.props.onSubmit(e.target.id.value, e.target.kor_name.value,e.target.tag.value);
                console.log(e.target.hidden.value);
                this.choose_youtuber_data(e.target.hidden.value);
                
                }.bind(this)} >
           
               <img  style={Site}  src={this.props.image}></img>
               
                <div style = {Site}> <input  id = "choose_data" name = "id" data-id="4" type = "submit"  value={this.props.id} ></input> </div>
                <div style={Site}><input style={{borderStyle:'none'}} type="text" name = "kor_name" value = {this.props.kor_name} ></input></div>
                <input type = "hidden" id = "hidden" value = {this.props.id_num}></input> 
               
                <div style={ExtendedSite}><input style={{borderStyle:'none'}} type="text" name = "tag" value = {this.props.tag} ></input></div>
              
           </form>
        );
    }
}

export default Lefttop;