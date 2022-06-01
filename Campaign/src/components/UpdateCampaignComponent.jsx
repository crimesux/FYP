import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';

class UpdateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campaignID: this.props.match.params.campaignID,
            name: '',
            deadline: '',
            cStatus: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.changeCStatusHandler = this.changeCStatusHandler.bind(this);
        this.updateCampaign = this.updateCampaign.bind(this);
    }

    componentDidMount(){
        CampaignService.getCampaignBycampaignID(this.state.campaignID).then( (res) =>{
            let campaign = res.data;
            this.setState({name: campaign.name,
                deadline: campaign.deadline,
                cStatus : campaign.cStatus
            });
        });
    }

    updateCampaign = (e) => {
        e.preventDefault();
        let campaign = {name: this.state.name, deadline: this.state.deadline, cStatus: this.state.cStatus};
        console.log('campaign => ' + JSON.stringify(campaign));
        console.log('campaignID => ' + JSON.stringify(this.state.campaignID));
        CampaignService.updateCampaign(campaign, this.state.campaignID).then( res => {
            this.props.history.push('/campaigns');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDeadlineHandler= (event) => {
        this.setState({deadline: event.target.value});
    }

    changeStatusHandler= (event) => {
        this.setState({cStatus: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Campaign</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
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

                                        <button className="btn btn-success" onClick={this.updateCampaign}>Save</button>
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

export default UpdateCampaignComponent
