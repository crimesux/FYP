import axios from "axios";

const USERS_REST_API_URL="http://localhost:8080/api/results";

class UserService
{
    getCampaign()
    {
       return axios.get(USERS_REST_API_URL);
    }
    getCampaignId(campaignId)
    {
        return axios.get(USERS_REST_API_URL + "/" + campaignId);
    }
    
    updateVote(campaignId, choice)
    {
        return axios({
            method: 'put',
            url: USERS_REST_API_URL+"/"+ campaignId,
            headers: { 
              'Content-Type': 'text/plain'
            },
            data : choice
          });
    }
}
export default new UserService();