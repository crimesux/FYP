package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Campaign;
import net.javaguides.springboot.repository.CampaignRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CampaignController {

	@Autowired
	private CampaignRepository campaignRepository;
	
	// get all campaigns
	@GetMapping("/campaigns")
	public List<Campaign> getAllCampaigns(){
		return campaignRepository.findAll();
	}		
	
	// create campaign rest api
	@PostMapping("/campaigns")
	public Campaign createCampaign(@RequestBody Campaign campaign) {
		return campaignRepository.save(campaign);
	}
	
	// get campaign by campaignID rest api
	@GetMapping("/campaigns/{campaignID}")
	public ResponseEntity<Campaign> getCampaignById(@PathVariable Long campaignID) {
		Campaign campaign = campaignRepository.findById(campaignID)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not exist with campaign ID :" + campaignID));
		return ResponseEntity.ok(campaign);
	}
	
	// update campaign rest api
	@PutMapping("/campaigns/{campaignID}")
	public ResponseEntity<Campaign> updateCampaign(@PathVariable Long campaignID, @RequestBody Campaign campaignDetails){
		Campaign campaign = campaignRepository.findById(campaignID)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaignID + " does not exist"));
		
		campaign.setName(campaignDetails.getName());
		campaign.setHostID(campaignDetails.getHostID());
		campaign.setDeadline(campaignDetails.getDeadline());
		campaign.setStatus(campaignDetails.getStatus());
		
		Campaign updatedCampaign = campaignRepository.save(campaign);
		return ResponseEntity.ok(updatedCampaign);
	}
	
	
}
