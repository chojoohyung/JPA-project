package com.portfolio.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.ChattingDto;
import com.portfolio.dto.UsernameDto;
import com.portfolio.entity.ChatRoom;
import com.portfolio.service.ChatRoomService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestAPIController {
	private final ChatRoomService chatRoomService;

	/*
	 * 로그인 등록
	 */
	@PostMapping("/")
	@Tag(name = "유저")
	@Operation(
            summary = "유저 이름 등록",
            description = "사용자의 이름을 등록합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "성공적으로 사용자 이름을 등록함",
            content = @Content(mediaType = "application/json", schema = @Schema(type = "string"))
    )
	public void username(UsernameDto usernameDto, HttpSession session) {
		session.setAttribute("username", usernameDto.getUsername());
	}
	
	/*
	 * 로그인 조회
	 */
	@GetMapping("/")
	@Tag(name = "유저")
	@Operation(
            summary = "유저 이름 조회",
            description = "현재 인증된 사용자의 이름을 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "성공적으로 사용자 이름을 조회함",
            content = @Content(mediaType = "application/json", schema = @Schema(type = "string"))
    )
	public UsernameDto getUsername(HttpSession session) {
		UsernameDto usernameDto = new UsernameDto();
		usernameDto.setUsername((String) session.getAttribute("username"));
	    return usernameDto;
	}
	
	/*
	 * 채팅방 리스트 조회
	 */
	@GetMapping("/ChatRoom")
	public List<ChatRoom> ChatRoomList(){
		return chatRoomService.ChatRoomList();
	}
	
	/*
	 * 채팅방 생성
	 */
	@PostMapping("/createChatRoom")
	public void createChatRoom(String title, int num_of_people) {
		ChatRoom chatRoom = new ChatRoom();
		if(title == null) {
			title = "~님 방";
		}
		if (num_of_people <= 0 || num_of_people > 10) {
			num_of_people = 10;
		}
		
		chatRoom.setTitle(title);
		chatRoom.setNum_of_people(num_of_people);
		chatRoomService.createChatRoom(chatRoom);
	}
	
	/*
	 * 채팅 생성
	 */
	@MessageMapping("/chatting/{ChatRoomId}")
	@SendTo("/topic/message")
	public ChattingDto sendData(ChattingDto chattingDto, @PathVariable("ChatRoomId") String ChatRoomId) {
		
		return chattingDto;
	}
}
