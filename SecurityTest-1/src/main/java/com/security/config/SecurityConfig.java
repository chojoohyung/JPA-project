package com.security.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.security.handler.CustomLogoutHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                // 사용자 인증을 위한 코드 작성 (패스워드는 사용하지 않음)
                // 예를 들어, 데이터베이스에서 사용자 정보를 가져오거나 하여 UserDetails를 생성
                UserDetails user = User.builder()
                    .username(username)
                    .password(passwordEncoder().encode(""))  // 빈 패스워드
                    .roles("USER")
                    .build();

                return user;
            }
        };
    }

    @Bean
    public SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        // 동시 세션 제어 전략을 사용하는 경우
        return new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry());
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        // 세션 레지스트리 생성
        return new SessionRegistryImpl();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        	.authorizeHttpRequests((requests) -> requests
        		.requestMatchers("/").hasRole("USER")
                .anyRequest().authenticated()
        	)
            .formLogin((form) -> form
        		.loginPage("/login")
        		.permitAll()
        	)
            .logout((logout) -> logout
            	.addLogoutHandler(new CustomLogoutHandler())
            	.permitAll()
            )
            .sessionManagement((session) -> session
            	.maximumSessions(1)
            	.sessionRegistry(sessionRegistry())
            	.maxSessionsPreventsLogin(true)
            )
            .cors(cors -> cors
            	.configurationSource(corsConfigurationSource())
            )
            .csrf(AbstractHttpConfigurer::disable)
            ;
            
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000/"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Content-Type", "Authorization", "X-XSRF-token"));
        configuration.setAllowCredentials(false);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
