package com.somotfg.main.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.dto.AppUserLoginDTO;
import com.somotfg.main.dto.AppUserSingUpDTO;
import com.somotfg.main.service.LogInService;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/login")
@CrossOrigin(
    origins = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    })
public class LogInController {
    
    @Autowired
    private LogInService loginService;
    
    private Logger log = LoggerFactory.getLogger(LogInController.class);

    @PostMapping("/open/login")
    public ResponseEntity<Map<String, String>> logIn(@RequestBody AppUserLoginDTO userdto) {
        log.info("Entro al logIn");
        
        return ResponseEntity.ok().body(loginService.validateLogIn(userdto));
    }

    @PostMapping("/open/singup")
    public ResponseEntity<GenericResponse<AppUserDTO>> singUp(@RequestBody AppUserSingUpDTO userdto) throws Exception {

        GenericResponse<AppUserDTO> response = loginService.singUp(userdto);

        return ResponseEntity.status(response.getCode()).body(response);
    }
}
