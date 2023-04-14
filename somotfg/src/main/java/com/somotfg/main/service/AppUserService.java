package com.somotfg.main.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.model.AppUser;
import com.somotfg.main.repository.AppUserRepository;
import com.somotfg.main.service.interfaze.IAppUserService;

@Service
public class AppUserService implements IAppUserService {

    @Autowired
    private AppUserRepository repository;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    //===================****PRIVATE METHODS****===================
    private AppUserDTO model2dto(AppUser model) {
        AppUserDTO dto = new AppUserDTO();
        dto.setId(model.getId());
        dto.setUsername(model.getUsername());
        dto.setNombre(model.getNombre());
        dto.setApellido(model.getApellido());
        dto.setEdad(model.getEdad());
        dto.setGrado(model.getGrado());
        return dto;
    }

    private AppUser dto2model(AppUserDTO dto) {
        AppUser model = new AppUser();
        model.setId(dto.getId());
        model.setUsername(dto.getUsername());
        model.setNombre(dto.getNombre());
        model.setApellido(dto.getApellido());
        model.setEdad(dto.getEdad());
        model.setGrado(dto.getGrado());
        return model;
    }

    private AppUser save(AppUser user) {
        return repository.save(user);
    }


    //===================****SEARCH METHODS****===================
    @Override
    public List<AppUserDTO> searchAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchAll'");
    }

    @Override
    public AppUserDTO searchById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchById'");
    }

    @Override
    public AppUserDTO searchByUsername(String username) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByUsername'");
    }

    @Override
    public List<AppUserDTO> searchByGrado(String grado) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchByGrado'");
    }

    //===================****CREATE METHODS****===================
    @Override
    public AppUserDTO create(AppUserDTO newuser) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    //===================****UPDATE METHODS****===================
    @Override
    public AppUserDTO update(AppUserDTO newdata) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    //===================****DELETE METHODS****===================
    @Override
    public AppUserDTO deleteById(Long id) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public void deleteAll() throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }
    
}
