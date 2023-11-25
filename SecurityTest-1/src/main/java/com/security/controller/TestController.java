package com.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Controller
@Tag(name = "ViewController")
public class TestController {
	@GetMapping("/")
	@Operation(summary = "메인화면", description = "메인화면 뷰를 불러옵니다")
	@ApiResponse(
            responseCode = "200",
            description = "성공적으로 메인화면 불러옴",
            content = @Content(mediaType = "application/json", schema = @Schema(type = "view"))
    )
    public String home() {
        return "index";
    }
	
	@GetMapping("/login")
	@Operation(summary = "로그인화면", description = "로그인화면 뷰를 불러옵니다")
    public String login() {
        return "login";
    }
}
