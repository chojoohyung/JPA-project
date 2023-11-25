package com.security.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;

@RestController
@Tag(name = "예제 API", description = "Swagger 테스트용 API")
public class TestAPIController {
	
	@GetMapping("/a")
	@Operation(
            summary = "유저 이름 조회",
            description = "현재 인증된 사용자의 이름을 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "성공적으로 사용자 이름을 조회함",
            content = @Content(mediaType = "application/json", schema = @Schema(type = "string"))
    )
	public String getUserInfo(Principal principal, @Parameter(hidden = true)  String username) {
        return principal.getName();
    }
	
	@GetMapping("/aaa")
	public String getUserInfoaaa(Principal principal) {
        return "중복";
    }
}
