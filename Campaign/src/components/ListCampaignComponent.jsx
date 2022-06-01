import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class ListCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                campaigns: []
        }
        this.addCampaign = this.addCampaign.bind(this);
        this.editCampaign = this.editCampaign.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
    }

    deleteCampaign(campaignID){
        CampaignService.deleteCampaign(campaignID).then( res => {
            this.setState({campaigns: this.state.campaigns.filter(campaign => campaign.campaignID !== campaignID)});
        });
    }
    viewCampaign(campaignID){
        this.props.history.push(`/view-campaign/${campaignID}`);
    }
    editCampaign(campaignID){
        this.props.history.push(`/add-campaign/${campaignID}`);
    }

    componentDidMount(){
        CampaignService.getCampaigns().then((res) => {
            this.setState({ campaigns: res.data});
        });
    }

    addCampaign(){
        this.props.history.push('/add-campaign/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Campaigns List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCampaign}> Add Campaign</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Campaign Name</th>
                                    <th> Campaign Deadline</th>
                                    <th> Campaign Status</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.campaigns.map(
                                        campaign => 
                                        <tr key = {campaign.campaignID}>
                                             <td> { campaign.name} </td>   
                                             <td> {campaign.deadline}</td>
                                             <td> {campaign.cStatus}</td>
                                             <td>
                                                 <button onClick={ () => this.editCampaign(campaign.campaignID)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCampaign(campaign.campaignID)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCampaign(campaign.campaignID)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListCampaignComponent
