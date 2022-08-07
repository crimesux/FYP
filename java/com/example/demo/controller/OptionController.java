package com.example.demo.controller;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.demo.model.Campaign;
import com.example.demo.model.CampaignStatus;
import com.example.demo.model.Option;
import com.example.demo.repository.CampaignRepository;
import com.example.demo.repository.OptionRepository;
import com.example.demo.service.Encryption;
import Exception.ResourceNotFoundException;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OptionController {

	@Autowired
	private OptionRepository optionRepository;
	
	@Autowired 
	private CampaignRepository campaignRepository;
	
	// create options in campaign rest api
	@PostMapping("/campaigns/{campaign_id}/options")
	public Option createOption(@PathVariable(value = "campaign_id") Long campaign_id, @RequestBody Option optionRequest) {
	    Option option = campaignRepository.findById(campaign_id).map(campaign -> {
	    	optionRequest.setCampaign(campaign);
	    	return optionRepository.save(optionRequest);
	    }).orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));
	
	    return optionRepository.save(option);
	}
	
	// get all options by campaign ids rest api
	@GetMapping("/campaigns/{campaign_id}/options")
	public ResponseEntity<List<Option>> getAllOptionsByCampaignId(@PathVariable(value = "campaign_id") Long campaign_id) {
	    if (!campaignRepository.existsById(campaign_id)) {
	      throw new ResourceNotFoundException("Campaign " + campaign_id + " Not Found");
	    }
	    
	    Encryption paillier = new Encryption();
	    BigInteger key = paillier.KeyGen(32, 64);
	    List<Option> options = optionRepository.findByCampaignId(campaign_id);
	    for (int i = 0; i < options.size(); i++)
	    {
	    	
	    long m1 = options.get(i).getVoteCount();
	    BigInteger ccc =BigInteger.valueOf(m1);
	    options.get(i).setVoteCount(paillier.Decrypt(ccc).longValue());
	    }
	    return ResponseEntity.ok(options);
	}
		
	// update option rest api	
	@PutMapping("/options/{id}")
	public ResponseEntity<Option> updateOption(@PathVariable Long id, @RequestBody Option options){
		Option option = optionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));
		
		option.setOptionDesc(options.getOptionDesc());
		
		Option updatedOption= optionRepository.save(option);
		return ResponseEntity.ok(updatedOption);
	}

	// increment the selected option's vote count by one rest api
	@PutMapping("/campaigns/{campaign_id}/options")
	public ResponseEntity<List<Option>> voteOption(@PathVariable(value = "campaign_id") Long campaign_id, @RequestBody String choice){
		if (!campaignRepository.existsById(campaign_id)) {
		      throw new ResourceNotFoundException("Campaign " + campaign_id + " Not Found");
		    }
		Encryption paillier = new Encryption();
		
		List<Option> options = optionRepository.findByCampaignId(campaign_id);
		for (int i = 0; i < options.size(); i++) {
		    if(choice.equalsIgnoreCase(options.get(i).getOptionDesc())) 
		    {
		    	long m3 = options.get(i).getVoteCount();
		    	if(m3!=0) 
		    	{
		    		BigInteger key = paillier.KeyGen(32, 64);
		    		int m12=1;
					String m1 =String.valueOf(m12);
			        BigInteger m2 = new BigInteger(m1);
			        BigInteger c1 = paillier.Encrypt(m2);
			        BigInteger c2= paillier.Encrypt(BigInteger.valueOf(m3));
		    		BigInteger c = paillier.CiperMultiply(c1, c2);
		    		options.get(i).setVoteCount(c.longValue());
		    	}else 
		    	{
		    		BigInteger key = paillier.KeyGen(32, 64);
		    		int m12=1;
					String m1 =String.valueOf(m12);
			        BigInteger m2 = new BigInteger(m1);
			        BigInteger c1 = paillier.Encrypt(m2);
			        options.get(i).setVoteCount(c1.longValue());
		    	}
		    		
		    	
		    }
		}
		optionRepository.saveAll(options);
		return ResponseEntity.ok(options);
	}
	
	// delete option rest api
	@DeleteMapping("/options/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteOption(@PathVariable Long id){
		Option option = optionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Option " + id + " Not Found"));
		
		optionRepository.delete(option);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//delete option by campaign rest api
	@DeleteMapping("/campaigns/{campaign_id}/options")
	  public ResponseEntity<Map<String, Boolean>>deleteAllOptionsOfCampaign(@PathVariable(value = "campaign_id") Long campaign_id) {
		Campaign campaign = campaignRepository.findById(campaign_id)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign " + campaign_id + " Not Found"));

	    optionRepository.deleteByCampaignId(campaign_id);
	    Map<String, Boolean> response =  new HashMap<>();
	    response.put("deleted", Boolean.TRUE);
	    return ResponseEntity.ok(response);
	}
	
}
