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

import com.somotfg.main.dto.GradoDTO;
import com.somotfg.main.service.GradoService;
import com.somotfg.main.util.response.GenericResponse;

@CrossOrigin(origins = "*", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.DELETE,
    RequestMethod.PUT
})
@RestController
@RequestMapping("/somotfg/grado")
public class GradoController {

    @Autowired
    GradoService gradoService;

    private Logger log = LoggerFactory.getLogger(GradoController.class);

    // ====================== METODOS GET ======================
    @GetMapping("/getall")
    public ResponseEntity<GenericResponse<List<GradoDTO>>> getAll(
            @RequestParam(required = false, defaultValue = "0", name = "pageN") Integer pageN,
            @RequestParam(required = false, defaultValue = "50", name = "counts") Integer counts,
            @RequestParam(required = false, defaultValue = "cod", name = "fieldSort") String fieldSort) throws Exception {
        log.info("Entro al metodo getAll.");

        GenericResponse<List<GradoDTO>> response = new GenericResponse<>();

        if (fieldSort != null) {
            log.info("Entro a la opcion searchPagination&Sorting.");
            response = gradoService.searchPaginationSorting(pageN, counts, fieldSort);
        } else {
            log.info("Entro a la opcion searchPagination.");
            response = gradoService.searchPagination(pageN, counts);
        }

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<GenericResponse<GradoDTO>> getById(@RequestParam("gradoid") Long gradoid) throws Exception {
        log.info("Entro al metodo getById.");

        GenericResponse<GradoDTO> response = new GenericResponse<>();
        response = gradoService.searchById(gradoid);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbycod")
    public ResponseEntity<GenericResponse<GradoDTO>> getByCod(@RequestParam("cod") String cod)
            throws Exception {
        log.info("Entro al metodo getByCod.");

        GenericResponse<GradoDTO> response = new GenericResponse<>();
        response = gradoService.searchByCod(cod);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyfiltro")
    public ResponseEntity<GenericResponse<List<GradoDTO>>> getByFiltro(@RequestParam("filtro") String filtro)
            throws Exception {
        log.info("Entro al metodo getByFiltro.");

        GenericResponse<List<GradoDTO>> response = new GenericResponse<>();
        response = gradoService.searchByFiltro(filtro);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    // ====================== METODOS POST ======================
    @PostMapping("/admin/create")
    public ResponseEntity<GenericResponse<List<GradoDTO>>> createGrado(@RequestBody List<GradoDTO> newGrado) throws Exception {
        log.info("Entro al metodo createGrado.");

        GenericResponse<List<GradoDTO>> response = new GenericResponse<>();
        response = gradoService.create(newGrado);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/admin/update")
    public ResponseEntity<GenericResponse<GradoDTO>> updateGrado(@RequestBody GradoDTO newDataGrado) throws Exception {
        log.info("Entro al metodo updateGrado.");

        GenericResponse<GradoDTO> response = new GenericResponse<>();
        response = gradoService.update(newDataGrado);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    // ====================== METODOS DELETE ======================
    @DeleteMapping("/admin/deletebyid")
    public ResponseEntity<GenericResponse<List<GradoDTO>>> deleteById(@RequestBody List<Long> gradosids) throws Exception {
        log.info("Entro al metodo deleteById.");

        GenericResponse<List<GradoDTO>> response = new GenericResponse<>();
        response = gradoService.deleteById(gradosids);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @DeleteMapping("/admin/deleteall")
    public ResponseEntity<GenericResponse<String>> deleteAll() throws Exception {
        log.info("Entro al metodo deleteAll.");

        GenericResponse<String> response = new GenericResponse<>();
        response = gradoService.deleteAll();

        return ResponseEntity.status(response.getCode()).body(response);
    }

}