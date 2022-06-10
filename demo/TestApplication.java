package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.model.Result;
import com.example.demo.model.Campaign;
import com.example.demo.repository.CampaignRepository;
import com.example.demo.repository.ResultRepository;


@SpringBootApplication
public class TestApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
	}
	
	@Autowired
	private ResultRepository rRepository;
	@Autowired
	private CampaignRepository cRepository;
	
	@Override
	public void run(String... args) throws Exception {
		/*rRepository.save(new Result(1,1,"qn1"));
		rRepository.save(new Result(100,160,"qn2"));
		cRepository.save(new Campaign("qn1","option1","option2"));
		cRepository.save(new Campaign("qn2","hello","world"));*/
	}
	

}
