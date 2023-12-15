package com.portfolio.dto;

import lombok.Data;

//Message.java

@Data
public class Message {

 private String content;

 public Message() {
 }

 public Message(String content) {
     this.content = content;
 }

 public String getContent() {
     return content;
 }

 public void setContent(String content) {
     this.content = content;
 }
}
