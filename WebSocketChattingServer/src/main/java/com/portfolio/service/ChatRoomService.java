package com.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.portfolio.entity.ChatRoom;
import com.portfolio.repository.ChatRoomRepository;

import jakarta.persistence.EntityNotFoundException;
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
	
	public void deleteChatRoomById(Long roomId) {
		chatRoomRepository.deleteById(roomId);
	}
	
	public void plus(Long roomId) {
		ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(EntityNotFoundException::new);
		chatRoom.setNum_of_people(chatRoom.getNum_of_people()+1);
		chatRoomRepository.save(chatRoom);
	}
	
	public void minus(Long roomId) {
		ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(EntityNotFoundException::new);
		chatRoom.setNum_of_people(chatRoom.getNum_of_people()-1);
		if(chatRoom.getNum_of_people()<=0) {
			deleteChatRoomById(roomId);
		}
		else {
			chatRoomRepository.save(chatRoom);
		}
		
	}
	
}
