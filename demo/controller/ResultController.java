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

import com.example.demo.model.Result;
import com.example.demo.repository.CampaignRepository;
import com.example.demo.repository.ResultRepository;

import Exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ResultController {
	@Autowired
	private ResultRepository rRepository;
	
	
	@GetMapping("results")
	public List<Result> getCampaign(){
		return this.rRepository.findAll();
	}
	
	@GetMapping("results/{id}")
	public ResponseEntity<Result> getById(@PathVariable long id){
		Result cam= rRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Campaign not found")); 
		return ResponseEntity.ok(cam);
	}
	
	@PutMapping("results/{id}")
	public ResponseEntity<Result> update(@PathVariable long id, @RequestBody String choice){
		Result cam= rRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Campaign not found")); 
		if(choice.equalsIgnoreCase("first")) {
		cam.setFirst(cam.getFirst()+1);
		cam.setLast(cam.getLast());
		cam.setQn(cam.getQn());}
		else if(choice.equalsIgnoreCase("last")){
		cam.setFirst(cam.getFirst());
		cam.setLast(cam.getLast()+1);
		cam.setQn(cam.getQn());}
		else {
			cam.setFirst(cam.getFirst());
			cam.setLast(cam.getLast());
			cam.setQn(cam.getQn());
		}
		rRepository.save(cam);
		return ResponseEntity.ok(cam);
	}
	
	
	
	
}
