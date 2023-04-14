package com.somotfg.main.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.GradoDTO;
import com.somotfg.main.model.Grado;
import com.somotfg.main.repository.GradoRepository;
import com.somotfg.main.service.interfaze.IGradoService;

@Service
public class GradoService implements IGradoService {

    @Autowired
    private GradoRepository repository;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    //===================****PRIVATE METHODS****===================
    private GradoDTO model2dto(GradoDTO model) {
        GradoDTO dto = new GradoDTO();
        dto.setId(model.getId());
        dto.setNombre(model.getNombre());
        return dto;
    }

    private Grado dto2model(GradoDTO dto) {
        Grado model = new Grado();
        model.setId(dto.getId());
        model.setNombre(dto.getNombre());
        return model;
    }

    private Grado save(Grado user) {
        return repository.save(user);
    }


    //===================****SEARCH METHODS****===================
    @Override
    public List<GradoDTO> searchAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchAll'");
    }

    @Override
    public GradoDTO searchById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchById'");
    }

    @Override
    public GradoDTO searchByName(String name) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByName'");
    }

    //===================****CREATE METHODS****===================
    @Override
    public GradoDTO create(GradoDTO newgrado) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    //===================****UPDATE METHODS****===================
    @Override
    public GradoDTO update(GradoDTO newdata) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    //===================****DELETE METHODS****===================
    @Override
    public GradoDTO deleteById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public void deleteAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }
    
}
