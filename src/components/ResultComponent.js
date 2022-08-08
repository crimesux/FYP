import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignService from '../services/CampaignService'
import OptionService from '../services/OptionService'
import VoterService from '../services/VoterService'
import ReactApexChart from 'react-apexcharts'

class ResultComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={options:[], series:[], campaign: [], voter: [],
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
        const id = localStorage.getItem("campaign");
        console.log(id)
        CampaignService.getCampaignById(id).then( res => {
            this.setState({campaign: res.data});
        })
        OptionService.getOptionsByCampaign(id).then((response)=>{this.setState({options:response.data})
        });
        VoterService.getVotersByCampaign(id).then( res => {
            this.setState({voter: res.data});
        })
    }

    back(){
        this.props.navigate('/Voterpage');
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
        <div className="p-1 my-1">
            <div className="flex align-middle justify-end gap-x-1">
            {this.array()}
            <br></br>
                    <button
                    className="btn btn-dark"
                     id="backBtn"
                    onClick={this.back.bind(this)}
                    >
                    Back
                    </button>
                    <div class="card-header">Campaign Details</div>
                    <div className = "card mt-2">
                        <div className = "mb-3">
                            <label> Campaign Name: </label>
                            <div> { this.state.campaign.campaignName }</div>
                        </div>
                        <div className = "mb-3">
                            <label> Closing Date: </label>
                            <div> { this.state.campaign.deadline }</div>
                        </div>
                        <div className = "mb-3">
                            <label> Campaign Status: </label>
                            <div> { this.state.campaign.campaignStatus }</div>
                        </div>
                        <div className = "mb-3">
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
                            <td id="chart" classname="">
                        {
                            <ReactApexChart options={this.state.option} series={this.state.series} type="pie" width={380} />                                
                        }
                     </td>
                        </div>
                        
                    </div>
                </div> 
                            
        </div>
        )
    }
}
export default ResultComponent