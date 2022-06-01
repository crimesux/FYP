import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';

class CreateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            campaignID: this.props.match.params.campaignID,
            name: '',
            deadline: '',
            cStatus: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.saveOrUpdateCampaign = this.saveOrUpdateCampaign.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.campaignID === '_add'){
            return
        }else{
            CampaignService.getCampaignById(this.state.campaignID).then( (res) =>{
                let campaign = res.data;
                this.setState({name: campaign.name,
                    deadline: campaign.deadline,
                    cStatus : campaign.cStatus
                });
            });
        }        
    }
    saveOrUpdateCampaign = (e) => {
        e.preventDefault();
        let campaign = {name: this.state.name, deadline: this.state.deadline, cStatus: this.state.cStatus};
        console.log('campaign => ' + JSON.stringify(campaign));

        // step 5
        if(this.state.campaignID === '_add'){
            CampaignService.createCampaign(campaign).then(res =>{
                this.props.history.push('/campaigns');
            });
        }else{
            CampaignService.updateCampaign(campaign, this.state.campaignID).then( res => {
                this.props.history.push('/campaigns');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDeadlineHandler= (event) => {
        this.setState({deadline: event.target.value});
    }

    changeCStatusHandler= (event) => {
        this.setState({cStatus: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Campaign</h3>
        }else{
            return <h3 className="text-center">Update Campaign</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Campaign Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Deadline: </label>
                                            <input placeholder="Deadline" name="deadline" className="form-control" 
                                                value={this.state.deadline} onChange={this.changeDeadlineHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Campaign Status: </label>
                                            <input placeholder="Campaign Status" name="cStatus" className="form-control" 
                                                value={this.state.cStatus} onChange={this.changeCStatusHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCampaign}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCampaignComponent
