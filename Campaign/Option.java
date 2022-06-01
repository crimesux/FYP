package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "options")
public class Option {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long optionID;
	
	@Column(name = "option")
	private String option;
	
	@Column(name = "count")
	private int count;
	
	public Option() {
		
	}
	
	public Option(String option, int count) {
		super();
		this.option = option;
		this.count = count;
	}
	public long getOptionID() {
		return optionID;
	}
	public void setOptionID(long optionID) {
		this.optionID = optionID;
	}
	public String getOption() {
		return option;
	}
	public void setOption(String option) {
		this.option = option;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
