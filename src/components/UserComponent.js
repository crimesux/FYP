import React from "react";
import UserService from "../service/UserService";
import { VictoryPie } from "victory-pie";

class UserComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={campaigns:[]}
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
                            campaign=><tr key ={campaign.id}>
                                <td>{campaign.id}</td>
                                <td>{campaign.qn}</td>
                                <td>{campaign.first}</td>
                                <td>{campaign.last}</td>
                                <VictoryPie
                                data={[{x:"first",y:campaign.first},{x:"last",y:campaign.last}]}
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