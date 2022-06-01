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
import net.javaguides.springboot.model.Voter;
import net.javaguides.springboot.repository.VoterRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class VoterController {

	@Autowired
	private VoterRepository voterRepository;
	
	// get all voters
	@GetMapping("/voters")
	public List<Voter> getAllVoters(){
		return voterRepository.findAll();
	}		
	
	// create voter rest api
	@PostMapping("/voters")
	public Voter createVoter(@RequestBody Voter voter) {
		return voterRepository.save(voter);
	}
	
	// get voter by voterID rest api
	@GetMapping("/voter/{voterID}")
	public ResponseEntity<Voter> getVoterById(@PathVariable Long voterID) {
		Voter voter = voterRepository.findById(voterID)
				.orElseThrow(() -> new ResourceNotFoundException("Voter " + voterID + " does not exist"));
		return ResponseEntity.ok(voter);
	}
	
	// delete voter rest api
	@DeleteMapping("/voter/{voterID}")
	public ResponseEntity<Map<String, Boolean>> deleteOption(@PathVariable Long voterID){
		Voter voter = voterRepository.findById(voterID)
				.orElseThrow(() -> new ResourceNotFoundException(""));
		
		voterRepository.delete(voter);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
