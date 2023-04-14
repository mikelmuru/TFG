package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.GradoDTO;

@Service
public interface IGradoService {

    //  SEARCH METHODS =====================
    List<GradoDTO> searchAll() throws Exception;
    GradoDTO searchById(Long id) throws Exception;
    GradoDTO searchByName(String name) throws Exception;

    //  SAVE METHODS =====================
    GradoDTO create(GradoDTO newgrado) throws Exception;

    //  UPDATE METHODS =====================
    GradoDTO update(GradoDTO newdata) throws Exception;

    //  DELETE METHODS =====================
    GradoDTO deleteById(Long id) throws Exception;
    void deleteAll() throws Exception;
}
