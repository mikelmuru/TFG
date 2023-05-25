package com.somotfg.main.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.model.AppUser;
import com.somotfg.main.repository.AppUserRepository;
import com.somotfg.main.security.JwtTokenUtil;
import com.somotfg.main.util.response.GenericResponse;

@Service
public class LogInService {

    @Autowired
    private AppUserRepository userRepository;
    
    @Autowired
    private AppUserService userService;

    @Autowired
    private JwtTokenUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;
    

    public Map<String, String> validateLogIn(AppUserDTO userdto) {
        
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userdto.getUsername(), userdto.getPassword());
        
        Authentication authentication = authenticationManager.authenticate(token);
        User userDetails = (User) authentication.getPrincipal();
        AppUser user = userRepository.findByUsername(userDetails.getUsername()).get();

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);

        return tokens;
    }

    public GenericResponse<AppUserDTO> singUp(AppUserDTO userdto) throws Exception {
        GenericResponse<AppUserDTO> saved = userService.create(userdto);

        return saved;
    }
}
