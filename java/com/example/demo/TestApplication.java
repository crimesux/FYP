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
	
	@Autowired
	private UserRepository uRepository;
	@Override
	public void run(String... args) throws Exception {
		/*rRepository.save(new Result(1,1,"qn1"));
		rRepository.save(new Result(100,160,"qn2"));
		uRepository.save(new User("sean","ong","@gmail",UserType.Voter));*/
		
	}
	

}
