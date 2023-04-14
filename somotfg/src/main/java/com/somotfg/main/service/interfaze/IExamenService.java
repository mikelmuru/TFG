package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.ExamenDTO;

@Service
public interface IExamenService {

    //  SEARCH METHODS =====================
    List<ExamenDTO> searchAll() throws Exception;
    ExamenDTO searchById(Long id) throws Exception;
    List<ExamenDTO> searchByGrado(String grado) throws Exception;

    //  SAVE METHODS =====================
    ExamenDTO create(ExamenDTO newexamen) throws Exception;

    //  UPDATE METHODS =====================
    ExamenDTO update(ExamenDTO newdata) throws Exception;

    //  DELETE METHODS =====================
    ExamenDTO deleteById(Long id) throws Exception;
    void deleteAll() throws Exception;
}
