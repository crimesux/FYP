import React from "react";
import OptionService from "../services/OptionService";
import ReactApexChart from 'react-apexcharts'

class ResultComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={id: this.props.match.params.id, options:[], series:[], 
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
        OptionService.getOptionsByCampaign(this.state.id).then((response)=>{this.setState({options:response.data})
    });
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
            <h1 className="text-center">Campaign List</h1>
            <table className="table table-striped">
                <thead>
                    {
                        this.state.options.map(
                        result=><td key ={result.id}>
                        <td>{result.optionDesc}</td>

                    </td>
                    )
                    }
                   <td>result</td>
                </thead>      
                <tbody>
                    {
                        this.state.options.map(
                            result=><td key ={result.id}>
                            <td>{result.voteCount}</td> 

                     </td>
                        )
                    }
                    {this.array()}
                    <td id="chart">
                        {
                            <ReactApexChart options={this.state.option} series={this.state.series} type="pie" width={380} />                                
                        }
                        </td>         
                    </tbody>

            </table>

        </div>
        )
    }
}
export default ResultComponent