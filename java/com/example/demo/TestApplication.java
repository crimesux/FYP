package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.repository.UserRepository;
import com.example.demo.model.Option;

@SpringBootApplication
public class TestApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
	}
	

}
