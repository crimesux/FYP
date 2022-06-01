package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Campaign;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long>{

}
