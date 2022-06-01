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
import net.javaguides.springboot.model.Option;
import net.javaguides.springboot.repository.OptionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OptionController {

	@Autowired
	private OptionRepository optionRepository;
	
	// create option rest api
	@PostMapping("/options")
	public Option createOption(@RequestBody Option option) {
		return optionRepository.save(option);
	}
	
	// delete option rest api
	@DeleteMapping("/option/{optionID}")
	public ResponseEntity<Map<String, Boolean>> deleteOption(@PathVariable Long optionID){
		Option option = optionRepository.findById(optionID)
				.orElseThrow(() -> new ResourceNotFoundException(""));
		
		optionRepository.delete(option);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
