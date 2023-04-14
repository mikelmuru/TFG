package com.somotfg.main.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.model.Examen;
import com.somotfg.main.repository.ExamenRepository;
import com.somotfg.main.service.interfaze.IExamenService;

@Service
public class ExamenService implements IExamenService {

    @Autowired
    private ExamenRepository repository;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    //===================****PRIVATE METHODS****===================
    private ExamenDTO model2dto(Examen model) {
        ExamenDTO dto = new ExamenDTO();
        dto.setId(model.getId());
        dto.setDescripcion(model.getDescripcion());
        dto.setFecha(model.getFecha());
        dto.setGrado(model.getGrado());
        return dto;
    }

    private Examen dto2model(ExamenDTO dto) {
        Examen model = new Examen();
        model.setId(dto.getId());
        model.setDescripcion(dto.getDescripcion());
        model.setFecha(dto.getFecha());
        model.setGrado(dto.getGrado());
        return model;
    }

    private Examen save(Examen user) {
        return repository.save(user);
    }


    //===================****SEARCH METHODS****===================
    @Override
    public List<ExamenDTO> searchAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchAll'");
    }

    @Override
    public ExamenDTO searchById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchById'");
    }

    @Override
    public List<ExamenDTO> searchByGrado(String grado) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByGrado'");
    }

    //===================****CREATE METHODS****===================
    @Override
    public ExamenDTO create(ExamenDTO newexamen) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    //===================****UPDATE METHODS****===================
    @Override
    public ExamenDTO update(ExamenDTO newdata) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    //===================****DELETE METHODS****===================
    @Override
    public ExamenDTO deleteById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public void deleteAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }
    
}
