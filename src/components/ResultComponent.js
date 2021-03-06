import React from "react";
import CampaignService from '../services/CampaignService'
import OptionService from '../services/OptionService'
import VoterService from '../services/VoterService'
import ReactApexChart from 'react-apexcharts'

class ResultComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={id: this.props.match.params.id, options:[], series:[], campaign: {}, voter: [],
            option: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: [],
                responsive: [{
                  breakpoint: 480,
                  option: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }]
              },
            
            
            };}
    
            
    componentDidMount()
    {
        CampaignService.getCampaignById(this.state.id).then( res => {
            this.setState({campaign: res.data});
        })
        OptionService.getOptionsByCampaign(this.state.id).then((response)=>{this.setState({options:response.data})
        });
        VoterService.getVotersByCampaign(this.state.id).then( res => {
            this.setState({voter: res.data});
        })
    }

    back(){
        this.props.history.push('/voter-list/1');
    }

    array()
            {
                if(this.state.series.length===0)
                for(var i of this.state.options)
                {
                    this.state.series.push(i.voteCount)
                    this.state.option.labels.push(i.optionDesc)
                }
                
        }
    render()
    {
        return(    
        <div>
            {this.array()}
            <br></br>
            <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Campaign Details</h3>
                    <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "10px",width: "100px"}}>Back</button>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Campaign Name: </label>
                            <div> { this.state.campaign.campaignName }</div>
                        </div>
                        <div className = "row">
                            <label> Closing Date: </label>
                            <div> { this.state.campaign.deadline }</div>
                        </div>
                        <div className = "row">
                            <label> Campaign Status: </label>
                            <div> { this.state.campaign.campaignStatus }</div>
                        </div>
                        <div className = "row">
                            <label> Options: </label>
                            <div> 
                                <table className="">
                                    {
                                        this.state.options.map(
                                            option => 
                                            <tr key = {option.id}>
                                                <td> {option.optionDesc} </td>   
                                            </tr>
                                        )
                                    }
                                </table>
                            </div>
                        </div>
                        <td id="chart" classname="row">
                        {
                            <ReactApexChart options={this.state.option} series={this.state.series} type="pie" width={380} />                                
                        }
                     </td>
                    </div>
                </div> 
                            
        </div>
        )
    }
}
export default ResultComponent