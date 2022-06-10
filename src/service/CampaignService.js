import axios from "axios";

const USERS_REST_API_URL="http://localhost:8080/api/campaigns";

class CampaignService
{
    getCampaignId(campaignId)
    {
        return axios.get(USERS_REST_API_URL + "/" + campaignId);
    }
}
export default new CampaignService();