import React, {Component} from'react';
import axios from 'axios';

class Righttop extends Component{

    choose_tag_data(hidden){ 
        var searchingFile = hidden;
        axios(
            {
              headers: {"Content-Type": "application/json"},
              url: '/choose_tag',
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
        {/*const st = {
            width:'525px',
            height:'35px',
            border:'0.01px',
            borderStyle:'dashed',
            borderRadius:'50%',
            textAlign:'center',
            backgroundColor:'white'
            
        }*/}

        const btnStyle = {
          fontFamily: "PoorStory-Regular",
          color: "black",
          background: "white",
          padding: ".375rem .75rem",
          border: "1px solid white",
          borderRadius: ".25rem",
          fontSize: "1.5rem",
          fontWeight:"bold",
          lineHeight: 1.5,
          padding:'5px',
          margin:'10px'
        };
        
        
        return(
           <form onSubmit={ function(e){
            e.preventDefault();
            if(window.confirm("이 태그가 중복되지 않았는지 확인하세요: "+e.target.id.value )){
                
                this.props.onSubmit(e.target.hidden.value, e.target.id.value); 
                this.choose_tag_data(e.target.hidden.value);

                alert("선택목록에 추가했습니다: "+e.target.id.value);
           }
                
                }.bind(this)}>

                <div> <input  style = {btnStyle} id = "choose_tag_data" name = "id" type = "submit"  value={this.props.tag} ></input> </div>
                <input type = "hidden" name = "hidden" value = {this.props.cnt}></input> 
           </form>
               
        

        );
    }
}

export default Righttop;