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
import org.springframework.web.bind.annotation.RestController;

import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.service.AsignaturaService;
import com.somotfg.main.util.response.GenericResponse;

@RestController
@RequestMapping("/somotfg/asignatura")
@CrossOrigin(origins = "*", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
})
public class AsignaturaController {

    @Autowired
    AsignaturaService asignaturaService;

    private Logger log = LoggerFactory.getLogger(AsignaturaController.class);

    // ====================== METODOS POST ======================
    @GetMapping("/getall")
    public ResponseEntity<GenericResponse<List<AsignaturaDTO>>> getAll(
            @RequestParam(required = false, defaultValue = "0") Integer pageN,
            @RequestParam(required = false, defaultValue = "10") Integer counts,
            @RequestParam(required = false) String fieldSort) throws Exception {
        log.info("Entro al metodo getAll.");

        GenericResponse<List<AsignaturaDTO>> response = new GenericResponse<>();

        if (fieldSort != null) {
            log.info("Entro a la opcion searchPagination&Sorting.");
            response = asignaturaService.searchPaginationSorting(pageN, counts, fieldSort);
        } else {
            log.info("Entro a la opcion searchPagination.");
            response = asignaturaService.searchPagination(pageN, counts);
        }

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbygrado")
    public ResponseEntity<GenericResponse<List<AsignaturaDTO>>> getByGrado(@RequestParam("gradocod") String gradocod) throws Exception {
        log.info("Entro al metodo getByGrado");

        GenericResponse<List<AsignaturaDTO>> response = new GenericResponse<>();
        response = asignaturaService.searchByGrado(gradocod);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyfiltro")
    public ResponseEntity<GenericResponse<List<AsignaturaDTO>>> getByFiltro(@RequestParam("filtro") String filtro)
            throws Exception {
        log.info("Entro al metodo getByFiltro.");

        GenericResponse<List<AsignaturaDTO>> response = new GenericResponse<>();
        response = asignaturaService.searchByFiltro(filtro);

        return ResponseEntity.status(response.getCode()).body(response);
    }


    // ====================== METODOS POST ======================
    @PostMapping("/create")
    public ResponseEntity<GenericResponse<List<AsignaturaDTO>>> createAsignatura(
            @RequestBody List<AsignaturaDTO> newAsignatura) throws Exception {
        log.info("Entro al metodo createAsignatura.");

        GenericResponse<List<AsignaturaDTO>> response = new GenericResponse<>();
        response = asignaturaService.create(newAsignatura);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<GenericResponse<AsignaturaDTO>> updateAsignatura(@RequestBody AsignaturaDTO newDataAsignatura)
            throws Exception {
        log.info("Entro al metodo updateAsignatura.");

        GenericResponse<AsignaturaDTO> response = new GenericResponse<>();
        response = asignaturaService.update(newDataAsignatura);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    // ====================== METODOS DELETE ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<GenericResponse<List<AsignaturaDTO>>> deleteById(@RequestBody List<Long> asignaturaIds)
            throws Exception {
        log.info("Entro al metodo deleteById.");

        GenericResponse<List<AsignaturaDTO>> response = new GenericResponse<>();
        response = asignaturaService.deleteById(asignaturaIds);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<GenericResponse<String>> deleteAll() throws Exception {
        log.info("Entro al metodo deleteAll.");

        GenericResponse<String> response = new GenericResponse<>();
        response = asignaturaService.deleteAll();

        return ResponseEntity.status(response.getCode()).body(response);
    }

}
