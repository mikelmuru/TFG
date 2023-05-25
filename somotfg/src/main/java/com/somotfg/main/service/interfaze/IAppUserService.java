package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.util.response.GenericResponse;

@Service
public interface IAppUserService {

    //  SEARCH METHODS =====================
    List<AppUserDTO> searchAll() throws Exception;
    GenericResponse<List<AppUserDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception;
    GenericResponse<List<AppUserDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort) throws Exception;
    GenericResponse<AppUserDTO> searchById(Long id) throws Exception;
    GenericResponse<AppUserDTO> searchByUsername(String username) throws Exception;
    GenericResponse<List<AppUserDTO>> searchByFiltro(String filtro) throws Exception;

    //  SAVE METHODS =====================
    GenericResponse<AppUserDTO> create(AppUserDTO newuser) throws Exception;

    //  UPDATE METHODS =====================
    GenericResponse<AppUserDTO> update(AppUserDTO newdata) throws Exception;

    //  DELETE METHODS =====================

    // Delete multiple
    GenericResponse<List<AppUserDTO>> deleteById(List<Long> id) throws Exception;
    
    // Utilidad?????
    GenericResponse<String> deleteAll() throws Exception;
}
