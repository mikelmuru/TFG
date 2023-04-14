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

import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/examen")
@CrossOrigin(
    origins = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    })
public class ExamenController {
    
    private Logger log = LoggerFactory.getLogger(AppUserController.class);

    //  ======================  METODOS GET  ======================
    @GetMapping("/getall")
    public ResponseEntity<List<ExamenDTO>> getAll() {
        log.info("Entro al metodo getAll.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbyid")
    public ResponseEntity<ExamenDTO> getById(@RequestParam("examenId") Long examenId) {
        log.info("Entro al metodo getById.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbygrado")
    public ResponseEntity<List<ExamenDTO>> getByGrado(@RequestParam("grado") String grado) {
        log.info("Entro al metodo getByGrado.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PostMapping("/create")
    public ResponseEntity<ExamenDTO> createExamen(@RequestBody ExamenDTO newExamen) {
        log.info("Entro al metodo createExamen.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PutMapping("/update")
    public ResponseEntity<ExamenDTO> updateExamen(@RequestBody ExamenDTO newDataExamen) {
        log.info("Entro al metodo updateExamen.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS DELETE  ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<ExamenDTO> deleteById(@RequestParam("examenId") Long examenId) {
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