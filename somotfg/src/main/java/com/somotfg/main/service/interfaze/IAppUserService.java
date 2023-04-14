package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AppUserDTO;

@Service
public interface IAppUserService {

    //  SEARCH METHODS =====================
    List<AppUserDTO> searchAll() throws Exception;
    AppUserDTO searchById(Long id) throws Exception;
    AppUserDTO searchByUsername(String username) throws Exception;
    List<AppUserDTO> searchByGrado(String grado) throws Exception;

    //  SAVE METHODS =====================
    AppUserDTO create(AppUserDTO newuser) throws Exception;

    //  UPDATE METHODS =====================
    AppUserDTO update(AppUserDTO newdata) throws Exception;

    //  DELETE METHODS =====================
    AppUserDTO deleteById(Long id) throws Exception;
    void deleteAll() throws Exception;
}
