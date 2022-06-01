package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "voters")
public class Voter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long voterID;
	
	@Column(name = "campaignID")
	private long campaignID;
	
	@Column(name = "staus")
	private int vStatus;
	
	public Voter() {
		
	}
	
	public Voter(long campaignID, int vStatus) {
		super();
		this.campaignID = campaignID;
		this.vStatus = vStatus;
	}
	public long getVoterID() {
		return voterID;
	}
	public void setVoterID(long voterID) {
		this.voterID = voterID;
	}
	public long getCampaignID() {
		return campaignID;
	}
	public void setCampaignID(long campaignID) {
		this.campaignID = campaignID;
	}
	public int getStatus() {
		return vStatus;
	}
	public void setStatus(int vStatus) {
		this.vStatus = vStatus;
	}
}
