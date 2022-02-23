import React, {Component} from'react';


class Lefttop extends Component{
    render(){
        const liststyle = {
            liststyleType:"circle",
            padding: "20px"
        }
        
        return(
           <div>
               <ul style={liststyle} >
                   <li>ㅇㅇ</li>
                   <li>dd</li>
               </ul>
           </div>
        );
    }
}

export default Lefttop