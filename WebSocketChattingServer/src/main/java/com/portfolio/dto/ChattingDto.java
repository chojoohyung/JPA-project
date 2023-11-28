package com.portfolio.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;
import lombok.Getter;

@Data
public class ChattingDto {
	private String username;
	private String content;
	private LocalDateTime createDate;
}
