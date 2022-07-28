package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Campaign;
import com.example.demo.model.CampaignStatus;
import com.example.demo.model.User;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long>{
	List<Campaign> findByUserId(Long postUserId);
	
	List<Campaign> findByCampaignStatus(CampaignStatus campaignStatus);

	@Transactional
	void deleteByUserId(long user_id);
}
