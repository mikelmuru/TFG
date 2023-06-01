package com.somotfg.main.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.somotfg.main.dto.ApunteDTO;
import com.somotfg.main.dto.ApunteNewDTO;
import com.somotfg.main.service.ApunteService;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/apunte")
@CrossOrigin(
    origins = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    })
public class ApuntesController {

    @Autowired
    private ApunteService apunteService;
    
    private Logger log = LoggerFactory.getLogger(ApuntesController.class);

    //  ======================  METODOS GET  ======================
    @GetMapping("/getall")
    public ResponseEntity<GenericResponse<List<ApunteDTO>>> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer pageN,
            @RequestParam(required = false, defaultValue = "10") Integer counts,
            @RequestParam(required = false) String fieldSort) throws Exception {
        log.info("Entro al metodo getAll.");

        GenericResponse<List<ApunteDTO>> response = new GenericResponse<>();

        if (fieldSort != null) {
            log.info("Entro a la opcion searchPagination&Sorting.");
            response = apunteService.searchPaginationSorting(pageN, counts, fieldSort);
        } else {
            log.info("Entro a la opcion searchPagination.");
            response = apunteService.searchPagination(pageN, counts);
        }

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<GenericResponse<ApunteDTO>> getById(@RequestParam("apunteid") Long apunteid) throws Exception {
        log.info("Entro al metodo getById.");

        GenericResponse<ApunteDTO> response = new GenericResponse<>();
        response = apunteService.searchById(apunteid);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyusername")
    public GenericResponse<List<ApunteDTO>> getByUsername(@RequestParam("username") String username) throws Exception {
        log.info("Entro al metodo getByUsername.");

        GenericResponse<List<ApunteDTO>> response = new GenericResponse<>();
        response = apunteService.searchByUsername(username);

        return response;
    }

    @GetMapping("/getbyasignatura")
    public GenericResponse<List<ApunteDTO>> getByAsignatura(@RequestParam("asignaturacod") String asignaturacod) throws Exception {
        log.info("Entro al metodo getByGrado.");
        
        GenericResponse<List<ApunteDTO>> response = new GenericResponse<>();
        response = apunteService.searchByAsignatura(asignaturacod);

        return response;
    }

    @GetMapping("/getbyfiltro")
    public ResponseEntity<GenericResponse<List<ApunteDTO>>> getByFiltro(@RequestParam("filtro") String filtro)
            throws Exception {
        log.info("Entro al metodo getByFiltro.");

        GenericResponse<List<ApunteDTO>> response = new GenericResponse<>();
        response = apunteService.searchByFiltro(filtro);

        return ResponseEntity.status(response.getCode()).body(response);
    }


    //  ======================  METODOS POST  ======================
    @PostMapping("/create")
    public ResponseEntity<GenericResponse<ApunteDTO>> createApuntes(
            @RequestPart(name = "newApuntes") String newApuntes,
            @RequestParam(name = "file") MultipartFile file
    ) throws Exception {
        log.info("Entro al metodo createApuntes.");

        ObjectMapper mapper = new ObjectMapper();
        ApunteNewDTO dto = new ApunteNewDTO();
        try {
            dto = mapper.readValue(newApuntes, ApunteNewDTO.class);
        } catch(Exception e) {
            log.error(e.getMessage());
        }
        
        GenericResponse<ApunteDTO> response = new GenericResponse<>();
        response = apunteService.create(dto, file);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<GenericResponse<ApunteDTO>> updateApuntes(@RequestBody ApunteDTO newDataApuntes) throws Exception {
        log.info("Entro al metodo updateApuntes.");
        
        GenericResponse<ApunteDTO> response = new GenericResponse<>();
        response = apunteService.update(newDataApuntes);

        return ResponseEntity.status(response.getCode()).body(response);
    }


    //  ======================  METODOS DELETE  ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<GenericResponse<List<ApunteDTO>>> deleteById(@RequestBody List<Long> userId) throws Exception {
        log.info("Entro al metodo deleteById.");

        GenericResponse<List<ApunteDTO>> response = new GenericResponse<>();
        response = apunteService.deleteById(userId);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @DeleteMapping("/admin/deleteall")
    public ResponseEntity<GenericResponse<String>> deleteAll() throws Exception {
        log.info("Entro al metodo deleteAll.");

        GenericResponse<String> response = new GenericResponse<>();
        response = apunteService.deleteAll();

        return ResponseEntity.status(response.getCode()).body(response);
    }
}