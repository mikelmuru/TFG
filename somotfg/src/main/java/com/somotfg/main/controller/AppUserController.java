package com.somotfg.main.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/user")
@CrossOrigin(
    origins = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    })
public class AppUserController {
    
    private Logger log = LoggerFactory.getLogger(AppUserController.class);

    //  ======================  METODOS GET  ======================
    @GetMapping("/getall")
    public ResponseEntity<List<AppUserDTO>> getAll() {
        log.info("Entro al metodo getAll.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbyid")
    public ResponseEntity<AppUserDTO> getById(@RequestParam("userId") Long userId) {
        log.info("Entro al metodo getById.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbyusername")
    public ResponseEntity<AppUserDTO> getByUsername(@RequestParam("username") String username) {
        log.info("Entro al metodo getByUsername.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbygrado")
    public ResponseEntity<List<AppUserDTO>> getByGrado(@RequestParam("grado") String grado) {
        log.info("Entro al metodo getByGrado.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PostMapping("/create")
    public ResponseEntity<AppUserDTO> createUser(@RequestBody AppUserDTO newUser) {
        log.info("Entro al metodo createUser.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PutMapping("/update")
    public ResponseEntity<AppUserDTO> updateUser(@RequestBody AppUserDTO newDataUser) {
        log.info("Entro al metodo updateUser.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS DELETE  ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<AppUserDTO> deleteById(@RequestParam("userId") Long userId) {
        log.info("Entro al metodo deleteById.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<GenericResponse> deleteAll() {
        log.info("Entro al metodo deleteAll.");
        //  LLAMADA AL SERVICIO
        return null;
    }
}
