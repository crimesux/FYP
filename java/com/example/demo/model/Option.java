package com.example.demo.model;

import java.math.BigInteger;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.example.demo.service.Encryption;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="options")
public class Option {
	@Id
	@Column(name="option_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="option_desc", nullable = false)
	private String optionDesc;
	
	@Column(name="vote_count")
	private long voteCount;
	
	@Column(name="pubkey")
	private long key=keyGen();
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "campaign_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	Campaign campaign;
	
	
	
	public Option() {
	}
	
	
	public Option(String optionDesc, Campaign campaign,long voteCount,long key) {
		super();
		this.optionDesc = optionDesc;
		this.campaign = campaign;	
		this.voteCount=voteCount;
		this.key=key;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOptionDesc() {
		return optionDesc;
	}
	public void setOptionDesc(String optionDesc) {
		this.optionDesc = optionDesc;
	}
	public Campaign getCampaign() {
		return campaign;
	}
	public void setCampaign(Campaign campaign) {
		this.campaign = campaign;
	}
	public long getVoteCount() {
		return voteCount;
	}
	public void setVoteCount(long voteCount) 
	{
		this.voteCount=voteCount;
	}
	public long getKey() 
	{
		return key;
	}
	public void setKey(long key) 
	{
		this.key=key;
	}
	public long keyGen() 
	{
		Encryption paillier = new Encryption();
		BigInteger key = paillier.KeyGen(32, 64);
		return key.longValue();
	}
}
