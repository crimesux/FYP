package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.model.Campaign;
import com.example.demo.repository.UserRepository;


@SpringBootApplication
public class TestApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
	}
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public void run(String... args) throws Exception {
		this.repository.save(new Campaign(200,100,"q1"));
		this.repository.save(new Campaign(600,200,"q2"));
		this.repository.save(new Campaign(1900,300,"q3"));
	}
	

}
