import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class VoterListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                id: this.props.match.params.id,
                campaigns: [],
                currentDate : new Date()
                
        }
    }
    componentDidMount(){
        CampaignService.getCampaignsByUser(this.state.id).then((res) => {
            this.setState({ campaigns: res.data});
        });
    }
    viewResults(id){
        this.props.history.push(`/result/${id}`);
    }
    voteResults(id){
        this.props.history.push(`/vote/${id}`);
    }
    viewCampaign(id,userid){
        this.props.history.push(`/view/${id}/${userid}`)
    }
    editUser(id){
        this.props.history.push(`/update-user/${id}`);
    }
    back(){
        this.props.history.push('/');
    }
    compare(status,type)
    {
        if(type==="vote")
        {
            if(status==="Open")
            {
            return ''
            }
            else 
            {
            return 'false'
            }
        }
        else if(type==="result")
        {
            if(status==="Closed")
            {
            return ''
            }
            else 
            {
            return 'false'
            }
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "1190px",width: "100px"}}> Logout</button>
                
                 <h2 className="text-center">Campaigns List</h2>
                 <div className = "row">
                 <button className="btn btn-primary" onClick={() => this.editUser(this.state.id)} style={{marginLeft: "1px",width: "100px"}}>Update Profile</button>
                 <button className="btn btn-primary" onClick={this.back.bind(this)} style={{marginLeft: "1100px",width: "100px"}}> search</button>
                 </div>
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
                                                 <button onClick={ () => this.viewCampaign(campaign.id,this.state.id)} className="btn btn-info">View </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.voteResults(campaign.id)} disabled={this.compare(campaign.campaignStatus,"vote")} className="btn btn-info">Vote </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewResults(campaign.id)} disabled={this.compare(campaign.campaignStatus,"result")} className="btn btn-info">Results </button>
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
