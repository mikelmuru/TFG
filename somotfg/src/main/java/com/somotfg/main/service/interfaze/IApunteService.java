package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.somotfg.main.dto.ApunteDTO;
import com.somotfg.main.dto.ApunteNewDTO;
import com.somotfg.main.util.response.GenericResponse;

@Service
public interface IApunteService {

    //  SEARCH METHODS =====================
    GenericResponse<List<ApunteDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception;
    GenericResponse<List<ApunteDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort) throws Exception;
    GenericResponse<ApunteDTO> searchById(Long id) throws Exception;
    GenericResponse<List<ApunteDTO>> searchByUsername(String username) throws Exception;
    GenericResponse<List<ApunteDTO>> searchByAsignatura(String asignaturacod) throws Exception;
    GenericResponse<List<ApunteDTO>> searchByFiltro(String filtro) throws Exception;
    // GenericResponse<List<ApunteDTO>> searchByGrado(String grado) throws Exception;

    //  SAVE METHODS =====================
    GenericResponse<ApunteDTO> create(ApunteNewDTO newapuntes, MultipartFile file) throws Exception;

    //  UPDATE METHODS =====================
    GenericResponse<ApunteDTO> update(ApunteDTO newdata) throws Exception;

    //  DELETE METHODS =====================

    // delete multiple
    GenericResponse<List<ApunteDTO>> deleteById(List<Long> id) throws Exception;

    // ?????????????
    GenericResponse<String> deleteAll() throws Exception;
}
