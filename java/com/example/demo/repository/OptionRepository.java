package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long>{
	List<Option> findByCampaignId(Long postCampaignId);
	  
	@Transactional
	void deleteByCampaignId(long campaign_id);

}
