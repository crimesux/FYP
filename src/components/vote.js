import React from "react";
import OptionService from "../services/OptionService";
import CampaignService from "../services/CampaignService";
class vote extends React.Component
{  
  constructor(props)
    {
        super(props)
        this.state={id: this.props.match.params.id, choice:"" , campaign:[], options:[]}
    }

    componentDidMount()
    {
        CampaignService.getCampaignId(this.state.id).then((response)=>{this.setState({campaign:response.data})
    });
        OptionService.getOptionsByCampaign(this.state.id).then((response)=>{this.setState({options:response.data})
    });
    }

  update=()=>
  {
    OptionService.updateVote(this.state.id,this.state.choice)
  }  

  setter(event) 
  {
   this.setState({choice:event.target.value})
   console.log(event.target.value);
}

render() {

  return (     
    <div>
      <h1>
      {this.state.campaign.campaignName}
      </h1>
      <body>
      {
        this.state.options.map((item) => 
        <p key={item}>
        <input 
        type="radio"
        name="option"
        value={item.optionDesc} 
        onClick={this.setter.bind(this)}/> {item.optionDesc} 
        </p>
        )}
      <br></br><button className="btn" onClick={this.update}>Submit</button>     
      </body>
      </div>
      

    )
    
   
}

}  
export default vote;