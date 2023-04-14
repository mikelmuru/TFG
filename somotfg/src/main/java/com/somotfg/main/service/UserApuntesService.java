package com.somotfg.main.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.UserApuntesDTO;
import com.somotfg.main.model.UserApuntes;
import com.somotfg.main.repository.UserApuntesRepository;
import com.somotfg.main.service.interfaze.IUserApuntesService;

@Service
public class UserApuntesService implements IUserApuntesService {

    @Autowired
    private UserApuntesRepository repository;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    //===================****PRIVATE METHODS****===================
    private UserApuntesDTO model2dto(UserApuntes model) {
        UserApuntesDTO dto = new UserApuntesDTO();
        dto.setId(model.getId());
        dto.setTitulo(model.getTitulo());
        dto.setDescripcion(model.getDescripcion());
        dto.setGrado(model.getGrado());
        return dto;
    }

    private UserApuntes dto2model(UserApuntesDTO dto) {
        UserApuntes model = new UserApuntes();
        model.setId(dto.getId());
        model.setDescripcion(dto.getDescripcion());
        model.setTitulo(dto.getTitulo());
        model.setGrado(dto.getGrado());
        return model;
    }

    private UserApuntes save(UserApuntes user) {
        return repository.save(user);
    }
    

    //===================****SEARCH METHODS****===================
    @Override
    public List<UserApuntesDTO> searchAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchAll'");
    }

    @Override
    public UserApuntesDTO searchById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchById'");
    }

    @Override
    public List<UserApuntesDTO> searchByUsername(String username) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByUsername'");
    }

    @Override
    public List<UserApuntesDTO> searchByGrado(String grado) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByGrado'");
    }

    //===================****CREATE METHODS****===================
    @Override
    public UserApuntesDTO create(UserApuntesDTO newapuntes) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    //===================****UPDATE METHODS****===================
    @Override
    public UserApuntesDTO update(UserApuntesDTO newdata) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    //===================****DELETE METHODS****===================
    @Override
    public UserApuntesDTO deleteById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public void deleteAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }
    
}
