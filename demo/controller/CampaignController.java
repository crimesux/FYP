package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Campaign;
import com.example.demo.model.Result;
import com.example.demo.repository.CampaignRepository;

import Exception.ResourceNotFoundException;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CampaignController {
	@Autowired
	private CampaignRepository cRepository;
	
	@GetMapping("campaigns/{id}")
	public ResponseEntity<Campaign> getById(@PathVariable long id){
		Campaign cam= cRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Campaign not found")); 
		return ResponseEntity.ok(cam);
	}
}