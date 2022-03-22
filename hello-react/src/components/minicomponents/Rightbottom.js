import React, {Component} from 'react';
class Rightbottom extends Component{
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
        }.bind(this)}>
        <div><input type = "submit" name = "id" value = {this.props.tag} ></input></div>
        </form>


    );
    }
}


export default Rightbottom;