import React from "react";

export default class FetchRandomUser extends React.Component{


    state = {
      loading: true
    };

    async componentDidMount(){

        const url = "http://localhost:5000/orders?page=1&limit=5";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      
    }

    render(){
        return(
        
        <div>
            {this.state.loading ? <div>loading...</div> : <div>person...</div>}
            
        </div>

        );
    }
    
    }