import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class ViewCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campaignID: this.props.match.params.campaignID,
            campaign: {}
        }
    }

    componentDidMount(){
        CampaignService.getCampaignByCampaignID(this.state.campaignID).then( res => {
            this.setState({campaign: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Campaign Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Campaign Name: </label>
                            <div> { this.state.campaign.name }</div>
                        </div>
                        <div className = "row">
                            <label> Campaign Deadline: </label>
                            <div> { this.state.campaign.deadline }</div>
                        </div>
                        <div className = "row">
                            <label> Campaign Status: </label>
                            <div> { this.state.campaign.cStatus }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCampaignComponent
