package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@NoArgsConstructor
@Data
public class CampaignRequest {

    private long id = 0;

    private String campaignName;

    private String campaignInfo;
    
    private String campaignMedia;

    private Date deadline;

    private CampaignStatus campaignStatus = CampaignStatus.Open;

    //private User user;

    private List<Option> options = new ArrayList<>();

    private List<VoterRequest> voters = new ArrayList<>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCampaignName() {
		return campaignName;
	}

	public void setCampaignName(String campaignName) {
		this.campaignName = campaignName;
	}

	public String getCampaignInfo() {
		return campaignInfo;
	}

	public void setCampaignInfo(String campaignInfo) {
		this.campaignInfo = campaignInfo;
	}

	public String getCampaignMedia() {
		return campaignMedia;
	}

	public void setCampaignMedia(String campaignMedia) {
		this.campaignMedia = campaignMedia;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public CampaignStatus getCampaignStatus() {
		return campaignStatus;
	}

	public void setCampaignStatus(CampaignStatus campaignStatus) {
		this.campaignStatus = campaignStatus;
	}

	public List<Option> getOptions() {
		return options;
	}

	public void setOptions(List<Option> options) {
		this.options = options;
	}

	public List<VoterRequest> getVoters() {
		return voters;
	}

	public void setVoters(List<VoterRequest> voters) {
		this.voters = voters;
	}
}
