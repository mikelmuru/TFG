package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.util.response.GenericResponse;

@Service
public interface IExamenService {
    // SEARCH METHODS
    GenericResponse<List<ExamenDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception;
    GenericResponse<List<ExamenDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort) throws Exception;
    GenericResponse<ExamenDTO> searchById(Long id) throws Exception;
    GenericResponse<List<ExamenDTO>> searchByUsername(String username) throws Exception;
    GenericResponse<List<ExamenDTO>> searchByAsignatura(AsignaturaDTO asignatura) throws Exception;
    GenericResponse<List<ExamenDTO>> searchByFiltro(String filtro) throws Exception;

    // SAVE METHODS
    GenericResponse<ExamenDTO> create(ExamenDTO newExamen, MultipartFile file) throws Exception;

    // UPDATE METHODS
    GenericResponse<ExamenDTO> update(ExamenDTO newdata) throws Exception;

    // DELETE METHODS
    GenericResponse<List<ExamenDTO>> deleteById(List<Long> ids) throws Exception;
    GenericResponse<String> deleteAll() throws Exception;
}
