package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.UserApuntesDTO;

@Service
public interface IUserApuntesService {

    //  SEARCH METHODS =====================
    List<UserApuntesDTO> searchAll() throws Exception;
    UserApuntesDTO searchById(Long id) throws Exception;
    List<UserApuntesDTO> searchByUsername(String username) throws Exception;
    List<UserApuntesDTO> searchByGrado(String grado) throws Exception;

    //  SAVE METHODS =====================
    UserApuntesDTO create(UserApuntesDTO newapuntes) throws Exception;

    //  UPDATE METHODS =====================
    UserApuntesDTO update(UserApuntesDTO newdata) throws Exception;

    //  DELETE METHODS =====================
    UserApuntesDTO deleteById(Long id) throws Exception;
    void deleteAll() throws Exception;
}
