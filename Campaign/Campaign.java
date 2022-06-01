package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "campaigns")
public class Campaign {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long campaignID;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "hostID")
	private long hostID;
	
	@Column(name = "deadline")
	private Date deadline;
	
	@Column(name = "cStatus")
	private int cStatus;
	
	public Campaign() {
		
	}
	
	public Campaign(String name, long hostID, Date deadline, int cStatus) {
		super();
		this.name = name;
		this.hostID = hostID;
		this.deadline = deadline;
		this.cStatus = cStatus;
	}
	public long getCampaignID() {
		return campaignID;
	}
	public void setCampaignID(long campaignID) {
		this.campaignID = campaignID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getHostID() {
		return hostID;
	}
	public void setHostID(long hostID) {
		this.hostID = hostID;
	}
	public Date getDeadline() {
		return deadline;
	}
	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}
	public int getStatus() {
		return cStatus;
	}
	public void setStatus(int cStatus) {
		this.cStatus = cStatus;
	}
}
