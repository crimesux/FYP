import React from "react";
import UserService from "../service/ResultService";
import CampaignService from "../service/CampaignService";

class vote extends React.Component
{  
  constructor(props)
    {
        super(props)
        this.state={choice:"" , campaign:[]}
    }

    componentDidMount()
    {
        CampaignService.getCampaignId(2).then((response)=>{this.setState({campaign:response.data})
    });//update the id to make it dynamic
    }

  update=()=>
  {
    console.log(this.state.choice);
    UserService.updateVote(2,this.state.choice)//update the id to make it dynamic
  }  

  setter(event) 
  {
   this.setState({choice:event.target.value})
   console.log(event.target.value);
}

render() {

  return (     
    <div onChange={this.setter.bind(this)}>
      
      <input type="radio" value="first" name="option"/> {this.state.campaign.option1} <br></br>
      <input type="radio" value="last" name="option"/> {this.state.campaign.option2}
      <br></br><button className="btn" onClick={this.update}>Submit</button>
      
      </div>

    )
    
   
}

}  
export default vote;