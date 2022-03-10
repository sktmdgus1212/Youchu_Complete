import React, {Component} from'react';
import axios from 'axios'; // 액시오스



class Lefttop extends Component{


        
   disable() {
        document.getElementById('choose_data').setAttribute('disabled', 'true')
      
              }


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
                
                    if(window.confirm("이 유투버가 중복되지 않았는지 확인하세요: "+e.target.id.value )){
                    //e.target.id.setAttribute('disabled','true');
                    //this.disable();
                    
                    this.props.onSubmit(e.target.hidden2.value,e.target.id.value, e.target.kor_name.value,e.target.tag.value); 
                    this.choose_youtuber_data(e.target.hidden.value);
                    alert("선택목록에 추가했습니다: "+e.target.id.value);
                    
                    }
                    
                    
                
                
                }.bind(this)} >
                    
                
                <input type = "hidden" name= "hidden2" value = {this.props.image}></input> 
                <img  style={Site}  src={this.props.image}></img>
                <div style = {Site}> <input  id = "choose_data" name = "id" type = "submit"  value={this.props.id} ></input> </div>
                <div style={Site}><input style={{borderStyle:'none'}} type="text" name = "kor_name" value = {this.props.kor_name} ></input></div>
                <input type = "hidden" name = "hidden" value = {this.props.id_num}></input> 
               
                <div style={ExtendedSite}><input style={{borderStyle:'none'}} size='35' type="text" name = "tag" value = {this.props.tag} ></input></div>
              
           </form>
        );
    }
}

export default Lefttop;