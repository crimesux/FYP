package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Voter;

@Repository
public interface VoterRepository extends JpaRepository<Voter, Long>{
	List<Voter> findByCampaignId(Long postCampaignId);

	List<Voter> findByUserId(Long postUserId);
	  
	@Transactional
	void deleteByCampaignId(long campaign_id);
	
	@Transactional
	void deleteByUserId(long user_id);

}
