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

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.service.AppUserService;
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

    @Autowired
    AppUserService userService;
    
    private Logger log = LoggerFactory.getLogger(AppUserController.class);

    //  ======================  METODOS GET  ======================
    @GetMapping("/getall")
    public ResponseEntity<GenericResponse<List<AppUserDTO>>> getAll(
                @RequestParam(required = false, defaultValue = "0") Integer pageN,
                @RequestParam(required = false, defaultValue = "10") Integer counts,
                @RequestParam(required = false) String fieldSort) throws Exception {
        log.info("Entro al metodo getAll.");
        
        GenericResponse<List<AppUserDTO>> response = new GenericResponse<>();
        
        if (fieldSort != null) {
            log.info("Entro a la opcion searchPagination&Sorting.");
            response = userService.searchPaginationSorting(pageN, counts, fieldSort);
        } else {
            log.info("Entro a la opcion searchPagination.");
            response = userService.searchPagination(pageN, counts);
        }

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<GenericResponse<AppUserDTO>> getById(@RequestParam("userId") Long userId) throws Exception {
        log.info("Entro al metodo getById.");

        GenericResponse<AppUserDTO> response = new GenericResponse<>();
        response = userService.searchById(userId);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyusername")
    public ResponseEntity<GenericResponse<AppUserDTO>> getByUsername(@RequestParam("username") String username) throws Exception {
        log.info("Entro al metodo getByUsername.");

        GenericResponse<AppUserDTO> response = new GenericResponse<>();
        response = userService.searchByUsername(username);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/getbyfiltro")
    public ResponseEntity<GenericResponse<List<AppUserDTO>>> getByFiltro(@RequestParam("filtro") String filtro) throws Exception {
        log.info("Entro al metodo getByFiltro.");

        GenericResponse<List<AppUserDTO>> response = new GenericResponse<>();
        response = userService.searchByFiltro(filtro);

        return ResponseEntity.status(response.getCode()).body(response);
    }


    //  ======================  METODOS POST  ======================
    @PostMapping("/create")
    public ResponseEntity<GenericResponse<AppUserDTO>> createUser(@RequestBody AppUserDTO newUser) throws Exception {
        log.info("Entro al metodo createUser.");

        GenericResponse<AppUserDTO> response = new GenericResponse<>();
        response = userService.create(newUser);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<GenericResponse<AppUserDTO>> updateUser(@RequestBody AppUserDTO newDataUser) throws Exception {
        log.info("Entro al metodo updateUser.");

        GenericResponse<AppUserDTO> response = new GenericResponse<>();
        response = userService.update(newDataUser);

        return ResponseEntity.status(response.getCode()).body(response);
    }


    //  ======================  METODOS DELETE  ======================
    @DeleteMapping("/deletebyid")
    public ResponseEntity<GenericResponse<List<AppUserDTO>>> deleteById(@RequestBody List<Long> userId) throws Exception {
        log.info("Entro al metodo deleteById.");
        
        GenericResponse<List<AppUserDTO>> response = new GenericResponse<>();
        response = userService.deleteById(userId);

        return ResponseEntity.status(response.getCode()).body(response);
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<GenericResponse<String>> deleteAll() throws Exception {
        log.info("Entro al metodo deleteAll.");
        
        GenericResponse<String> response = new GenericResponse<>();
        response = userService.deleteAll();

        return ResponseEntity.status(response.getCode()).body(response);
    }
}
