package com.portfolio.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter

public class ChatRoom {

	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	private int num_of_people;
	
	
}
