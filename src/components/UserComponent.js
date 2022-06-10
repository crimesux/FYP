import React from "react";
import UserService from "../service/ResultService";
import { VictoryPie } from "victory-pie";


class UserComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={campaigns:[],campaign:[]}
    }

    componentDidMount()
    {
        UserService.getCampaign().then((response)=>{this.setState({campaigns:response.data})
    });
    }
    
    render()
    {
        return(
        <div>
            <h1 className="text-center">Campaign List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Question</td>
                        <td>First</td>
                        <td>Last</td>
                        <td>result</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.campaigns.map(
                            result=><tr key ={result.id}>
                                <td>{result.id}</td>
                                <td>{result.qn}</td>
                                <td>{result.first}</td>
                                <td>{result.last}</td>
                                <VictoryPie
                                data={[{x:"first",y:result.first},{x:"last",y:result.last}]}
                                colorScale={["blue", "red"]}
                                radius={50}
                              />
        
                            </tr>
                        )
                    }
                </tbody>

            </table>

        </div>
        )
    }
}
export default UserComponent