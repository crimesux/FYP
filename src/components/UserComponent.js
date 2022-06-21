import React from "react";
import OptionService from "../services/OptionService";
import { VictoryPie } from "victory-pie";
import Chart from 'react-apexcharts'

class UserComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={id: this.props.match.params.id, options:[]}
    }

    componentDidMount()
    {
        OptionService.getOptionsByCampaign(this.state.id).then((response)=>{this.setState({options:response.data})
    });
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
                    </tbody>

            </table>

        </div>
        )
    }
}
export default UserComponent