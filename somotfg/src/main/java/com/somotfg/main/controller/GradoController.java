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

import com.somotfg.main.dto.GradoDTO;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/grado")
@CrossOrigin(
    origins = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    })
public class GradoController {
    
    private Logger log = LoggerFactory.getLogger(AppUserController.class);

    //  ======================  METODOS GET  ======================
    @GetMapping("/getall")
    public ResponseEntity<List<GradoDTO>> getAll() {
        log.info("Entro al metodo getAll.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbyid")
    public ResponseEntity<GradoDTO> getById(@RequestParam("gradoId") Long gradoId) {
        log.info("Entro al metodo getById.");
        //  LLAMADA AL SERVICIO
        return null;
    }

    @GetMapping("/getbyname")
    public ResponseEntity<List<GradoDTO>> getByName(@RequestParam("nombre") String nombre) {
        log.info("Entro al metodo getByName.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PostMapping("/create")
    public ResponseEntity<GradoDTO> createGrado(@RequestBody GradoDTO newGrado) {
        log.info("Entro al metodo createGrado.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS POST  ======================
    @PutMapping("/update")
    public ResponseEntity<GradoDTO> updateGrado(@RequestBody GradoDTO newDataGrado) {
        log.info("Entro al metodo updateGrado.");
        //  LLAMADA AL SERVICIO
        return null;
    }


    //  ======================  METODOS DELETE  ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<GradoDTO> deleteById(@RequestParam("gradoId") Long gradoId) {
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