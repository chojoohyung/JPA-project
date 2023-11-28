package com.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.portfolio.entity.ChatRoom;
import com.portfolio.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
	private final ChatRoomRepository chatRoomRepository;
	
	
	public void createChatRoom(ChatRoom chatRoom) {
		chatRoomRepository.save(chatRoom);
	
	}
	
	public List<ChatRoom> ChatRoomList(){
		return chatRoomRepository.findAll();
	}
	
}
