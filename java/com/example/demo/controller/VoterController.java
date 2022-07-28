package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.demo.model.Campaign;
import com.example.demo.model.CampaignStatus;
import com.example.demo.model.User;
import com.example.demo.model.UserType;
import com.example.demo.model.Voter;
import com.example.demo.repository.CampaignRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VoterRepository;

import Exception.ResourceNotFoundException;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class VoterController {

	@Autowired
	private VoterRepository voterRepository;
	
	@Autowired 
	private CampaignRepository campaignRepository;

	@Autowired 
	private UserRepository userRepository;	
	
	// create voters rest api
	@PostMapping("/campaigns/{campaign_id}/voters")
	public Voter createVoter(@PathVariable(value = "campaign_id") Long campaign_id, @RequestBody Voter voterRequest) {
	    Voter voter = campaignRepository.findById(campaign_id).map(campaign -> {
	    	voterRequest.setCampaign(campaign);
	    	return voterRepository.save(voterRequest);
	    }).orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));
	
	    return voterRepository.save(voter);
	}
	
	// get all voters by campaign ids rest api
	@GetMapping("/campaigns/{campaign_id}/voters")
	public ResponseEntity<List<Voter>> getAllVotersByCampaignId(@PathVariable(value = "campaign_id") Long campaign_id) {
	    if (!campaignRepository.existsById(campaign_id)) {
	      throw new ResourceNotFoundException("Campaign " + campaign_id + " Not Found");
	    }
	
	    List<Voter> voters = voterRepository.findByCampaignId(campaign_id);
	    return ResponseEntity.ok(voters);
	}
	
	// get all voters by user ids rest api
	@GetMapping("/users/{user_id}/voters")
	public ResponseEntity<List<Voter>> getAllVotersByUserId(@PathVariable(value = "user_id") Long user_id) {
	    if (!userRepository.existsById(user_id)) {
	      throw new ResourceNotFoundException("User " + user_id + " Not Found");
	    }
	
	    List<Voter> voters = voterRepository.findByCampaignId(user_id);
	    return ResponseEntity.ok(voters);
	}

	// delete voter rest api
	@DeleteMapping("/voters/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteVoter(@PathVariable Long id){
		Voter voter = voterRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Voter " + id + " Not Found"));
		
		voterRepository.delete(voter);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//delete voter by campaign rest api
	@DeleteMapping("/campaigns/{campaign_id}/voters")
	  public ResponseEntity<Map<String, Boolean>>deleteAllVotersOfCampaign(@PathVariable(value = "campaign_id") Long campaign_id) {
		Campaign campaign = campaignRepository.findById(campaign_id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));

	    voterRepository.deleteByCampaignId(campaign_id);
	    Map<String, Boolean> response =  new HashMap<>();
	    response.put("deleted", Boolean.TRUE);
	    return ResponseEntity.ok(response);
	}

	//delete voter by user rest api
	@DeleteMapping("/users/{user_id}/voters")
	  public ResponseEntity<Map<String, Boolean>>deleteAllVotersOfUser(@PathVariable(value = "user_id") Long user_id) {
		User user = userRepository.findById(user_id)
				.orElseThrow(() -> new ResourceNotFoundException("User " + user_id + " Not Found"));

	    voterRepository.deleteByUserId(user_id);
	    Map<String, Boolean> response =  new HashMap<>();
	    response.put("deleted", Boolean.TRUE);
	    return ResponseEntity.ok(response);
	}
	
}
