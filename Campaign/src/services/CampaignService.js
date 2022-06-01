import axios from 'axios';

const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/v1/campaigns";

class CampaignService {

    getCampaigns(){
        return axios.get(CAMPAIGN_API_BASE_URL);
    }

    createCampaign(campaign){
        return axios.post(CAMPAIGN_API_BASE_URL, campaign);
    }

    getCampaignById(campaignId){
        return axios.get(CAMPAIGN_API_BASE_URL + '/' + campaignID);
    }

    updateCampaign(campaign, campaignId){
        return axios.put(CAMPAIGN_API_BASE_URL + '/' + campaignID, campaign);
    }

    deleteCampaign(campaignId){
        return axios.delete(CAMPAIGN_API_BASE_URL + '/' + campaignID);
    }
}

export default new CampaignService()