package com.example.demo.repository;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;
import com.example.demo.model.UserType;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findByUserType(UserType userType);
	
}
