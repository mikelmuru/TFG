package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.GradoDTO;
import com.somotfg.main.util.response.GenericResponse;

@Service
public interface IGradoService {

    //  SEARCH METHODS =====================
    List<GradoDTO> searchAll() throws Exception;
    
    GenericResponse<List<GradoDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception;
    GenericResponse<List<GradoDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort) throws Exception;
    GenericResponse<GradoDTO> searchById(Long id) throws Exception;
    GenericResponse<GradoDTO> searchByCod(String cod) throws Exception;
    GenericResponse<List<GradoDTO>> searchByFiltro(String filtro) throws Exception;

    //  SAVE METHODS =====================
    GenericResponse<List<GradoDTO>> create(List<GradoDTO> gradosData) throws Exception;

    //  UPDATE METHODS =====================
    GenericResponse<GradoDTO> update(GradoDTO newdata) throws Exception;

    //  DELETE METHODS =====================

    // Delete multiple
    GenericResponse<List<GradoDTO>> deleteById(List<Long> id) throws Exception;
    
    // Utilidad?????
    GenericResponse<String> deleteAll() throws Exception;
}
