import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class VoterListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                campaigns: [],
                currentDate : new Date()
        }
    }
    componentDidMount(){
        CampaignService.getCampaigns().then((res) => {
            this.setState({ campaigns: res.data});
        });
    }
    viewResults(id){
        this.props.history.push(`/result/${id}`);
    }
    voteResults(id){
        this.props.history.push(`/vote/${id}`);
    }
    viewCampaign(id){
        this.props.history.push(`/view-campaign/${id}`);
    }
    compare(status)
    {
        console.log(status)
        if(status==="Open")
        {
            return ''
        }
        else 
        {
            return 'false'
        }
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Campaigns List</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Campaign Name</th>
                                    <th> Closing Date</th>
                                    <th> Campaign Status</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.campaigns.map(
                                        campaign => 
                                        <tr key = {campaign.id}>
                                             <td> {campaign.campaignName} </td>   
                                             <td> {campaign.deadline}</td>
                                             <td> {campaign.campaignStatus}</td>
                                             <td>                                            
                                                 <button onClick={ () => this.viewCampaign(campaign.id)} className="btn btn-info">View </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.voteResults(campaign.id)} disabled={this.compare(campaign.campaignStatus)} className="btn btn-info">Vote </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewResults(campaign.id)} disabled={!this.compare(campaign.campaignStatus)} className="btn btn-info">Results </button>
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

export default VoterListComponent
