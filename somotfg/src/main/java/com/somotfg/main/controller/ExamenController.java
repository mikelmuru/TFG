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

import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.service.ExamenService;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/examen")
@CrossOrigin(origins = "*", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
})
public class ExamenController {
    
    @Autowired
    private ExamenService examenService;

    private Logger log = LoggerFactory.getLogger(AppUserController.class);

    // ====================== METODOS GET ======================
    @GetMapping("/getall")
    public ResponseEntity<GenericResponse<List<ExamenDTO>>> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer pageN,
            @RequestParam(required = false, defaultValue = "10") Integer counts,
            @RequestParam(required = false) String fieldSort) throws Exception {
        log.info("Entro al metodo getAll.");

        GenericResponse<List<ExamenDTO>> response = new GenericResponse<>();

        if (fieldSort != null) {
            log.info("Entro a la opcion searchPagination&Sorting.");
            response = examenService.searchPaginationSorting(pageN, counts, fieldSort);
        } else {
            log.info("Entro a la opcion searchPagination.");
            response = examenService.searchPagination(pageN, counts);
        }

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<GenericResponse<ExamenDTO>> getById(@RequestParam("examenid") Long examenid)
            throws Exception {
        log.info("Entro al metodo getById.");

        GenericResponse<ExamenDTO> response = new GenericResponse<>();
        response = examenService.searchById(examenid);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyusername")
    public ResponseEntity<GenericResponse<List<ExamenDTO>>> getByUsername(@RequestParam("username") String username)
            throws Exception {
        log.info("Entro al metodo getByUsername.");

        GenericResponse<List<ExamenDTO>> response = new GenericResponse<>();
        response = examenService.searchByUsername(username);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyasignatura")
    public ResponseEntity<GenericResponse<List<ExamenDTO>>> getByAsignatura(@RequestBody AsignaturaDTO asignatura)
            throws Exception {
        log.info("Entro al metodo getByAsignatura.");

        GenericResponse<List<ExamenDTO>> response = new GenericResponse<>();
        response = examenService.searchByAsignatura(asignatura);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyfiltro")
    public ResponseEntity<GenericResponse<List<ExamenDTO>>> getByFiltro(@RequestParam("filtro") String filtro)
            throws Exception {
        log.info("Entro al metodo getByFiltro.");

        GenericResponse<List<ExamenDTO>> response = new GenericResponse<>();
        response = examenService.searchByFiltro(filtro);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    // ====================== METODOS POST ======================
    @PostMapping("/profesor/create")
    public ResponseEntity<GenericResponse<ExamenDTO>> createExamen(
            @RequestPart(name = "newExamen") ExamenDTO newExamen,
            @RequestPart(name = "file") MultipartFile file) throws Exception {
        log.info("Entro al metodo createExamen.");

        GenericResponse<ExamenDTO> response = new GenericResponse<>();
        response = examenService.create(newExamen, file);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/profesor/update")
    public ResponseEntity<GenericResponse<ExamenDTO>> updateExamen(@RequestBody ExamenDTO newDataExamen)
            throws Exception {
        log.info("Entro al metodo updateExamen.");

        GenericResponse<ExamenDTO> response = new GenericResponse<>();
        response = examenService.update(newDataExamen);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    // ====================== METODOS DELETE ======================
    @DeleteMapping("/profesor/deletebyid")
    public ResponseEntity<GenericResponse<List<ExamenDTO>>> deleteById(@RequestBody List<Long> examenIds)
            throws Exception {
        log.info("Entro al metodo deleteById.");

        GenericResponse<List<ExamenDTO>> response = new GenericResponse<>();
        response = examenService.deleteById(examenIds);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @DeleteMapping("/admin/deleteall")
    public ResponseEntity<GenericResponse<String>> deleteAll() throws Exception {
        log.info("Entro al metodo deleteAll.");

        GenericResponse<String> response = new GenericResponse<>();
        response = examenService.deleteAll();

        return ResponseEntity.status(response.getCode()).body(response);
    }

}