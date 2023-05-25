package com.somotfg.main.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AppUserDTO;
import com.somotfg.main.model.AppUser;
import com.somotfg.main.repository.AppUserRepository;
import com.somotfg.main.service.interfaze.IAppUserService;
import com.somotfg.main.util.response.GenericResponse;

@Service
public class AppUserService implements IAppUserService {

    @Autowired
    private AppUserRepository repository;

    private final ModelMapper modelMapper;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    public AppUserService() {
        this.modelMapper = new ModelMapper();
    }

    // ===================****PRIVATE METHODS****===================
    private AppUserDTO model2dto(AppUser model) {
        AppUserDTO dto = new AppUserDTO();
        dto = modelMapper.map(model, AppUserDTO.class);
        dto.setPassword(null);
        dto.setEliminado(model.getEliminado());
        return dto;
    }

    private AppUser dto2model(AppUserDTO dto) {
        AppUser model = new AppUser();
        model = modelMapper.map(dto, AppUser.class);
        // mapear a mano la contraseña con encriptador -> en el dto solo viene la password en el registro/login
        return model;
    }

    private AppUserDTO update (AppUserDTO original, AppUserDTO nuevo) {
        Class<AppUserDTO> clase = AppUserDTO.class;
        Field[] campos = clase.getDeclaredFields();

        for (Field campo : campos) {
            campo.setAccessible(true);
            try {
                Object valorOriginal = campo.get(original);
                Object valorNuevo = campo.get(nuevo);

                if (valorNuevo != null && !valorNuevo.equals(valorOriginal)) {
                    campo.set(original, valorNuevo);
                }
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }

        return original;
    }

    // DEVOLVEMOS UNA CLASE GENERICRESPONSE CON CODIGO-MENSAJE-RESULTADO(BODY)
    // EN CASO DE ERROR EL RESULT ES NULO
    private GenericResponse<AppUserDTO> save(AppUser user) {
        GenericResponse<AppUserDTO> isSaved = new GenericResponse<>();
        try {
            AppUser saved = repository.save(user);
            isSaved.setResult(model2dto(saved));
            isSaved.setMessage("CREATED");
            isSaved.setCode(201);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            isSaved.setMessage(e.getMessage());
            isSaved.setCode(500);
        }
        return isSaved;
    }

    // ===================****SEARCH METHODS****===================
    @Override
    public List<AppUserDTO> searchAll() throws Exception {
        return null;
        // List<AppUser> allUsers = repository.findAllPaginated(PageRequest.of(0, 10))
    }

    @Override
    public GenericResponse<List<AppUserDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception {

        Pageable pageable = PageRequest.of(offset, pageSize);
        List<AppUser> allUsers = repository.findAll(pageable).toList();
        GenericResponse<List<AppUserDTO>> result = new GenericResponse<>();

        List<AppUserDTO> helper = new ArrayList<>();
        for (AppUser usuario : allUsers) {
            helper.add(model2dto(usuario));
        }

        result.setResult(helper);
        result.setMessage("SUCCESS");
        result.setCode(200);

        return result;
    }

    @Override
    public GenericResponse<List<AppUserDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort)
            throws Exception {

        GenericResponse<List<AppUserDTO>> result = new GenericResponse<>();
        try {
            Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(fieldSort));
            List<AppUser> allUsers = repository.findAll(pageable).getContent();

            List<AppUserDTO> helper = new ArrayList<>();
            for (AppUser usuario : allUsers) {
                helper.add(model2dto(usuario));
            }
            result.setResult(helper);
            result.setMessage("SUCCESS");
            result.setCode(200);
        } catch (Exception e) {
            result.setMessage(e.getMessage());
            result.setCode(500);
        }

        return result;
    }

    @Override
    public GenericResponse<AppUserDTO> searchById(Long id) throws Exception {
        GenericResponse<AppUserDTO> result = new GenericResponse<>();
        Optional<AppUser> user = repository.findById(id);

        if (user.isPresent()) {
            result.setResult(model2dto(user.get()));
            result.setMessage("SUCCESS");
            result.setCode(200);
        } else {
            result.setMessage("Not Found");
            result.setCode(404);
        }

        return result;
    }

    @Override
    public GenericResponse<AppUserDTO> searchByUsername(String username) throws Exception {
        GenericResponse<AppUserDTO> result = new GenericResponse<>();
        Optional<AppUser> user = repository.findByUsername(username);

        if (user.isPresent()) {
            result.setResult(model2dto(user.get()));
            result.setMessage("SUCCESS");
            result.setCode(200);
        } else {
            result.setMessage("Not Found");
            result.setCode(404);
        }

        return result;
    }

    @Override
    public GenericResponse<List<AppUserDTO>> searchByFiltro(String filtro) throws Exception {
        GenericResponse<List<AppUserDTO>> result = new GenericResponse<>();

        List<AppUser> users = repository.findByFiltro(filtro);
        log.info(users.toString());
        List<AppUserDTO> dtos = new ArrayList<>();
        for (AppUser user : users) {
            dtos.add(model2dto(user));
        }
        result.setResult(dtos);

        if (users.size() == 0) {
            result.setMessage("NOT FOUND");
            result.setCode(404);
        } else {
            result.setMessage("SUCCESS");
            result.setCode(200);
        }

        return result;
    }

    // ===================****CREATE METHODS****===================
    @Override
    public GenericResponse<AppUserDTO> create(AppUserDTO newuser) throws Exception {
        AppUser user = dto2model(newuser);
        return save(user);
    }

    // ===================****UPDATE METHODS****===================
    @Override
    public GenericResponse<AppUserDTO> update(AppUserDTO newdata) throws Exception {
        Optional<AppUser> user = repository.findById(newdata.getId());
        GenericResponse<AppUserDTO> result = new GenericResponse<>();
        if (user.isPresent()) {
            AppUserDTO original = model2dto(user.get());
            AppUserDTO fullNewData = update(original,newdata);
            AppUser entity = dto2model(fullNewData);
            result = save(entity);
        }
        return result;
    }

    // ===================****DELETE METHODS****===================

    // Delete multiple por ids
    @Override
    public GenericResponse<List<AppUserDTO>> deleteById(List<Long> ids) throws Exception {
        GenericResponse<List<AppUserDTO>> result = new GenericResponse<>();
        List<AppUserDTO> usersDeleted = new ArrayList<>();
        for (Long id : ids) {
            Optional<AppUser> user = repository.findById(id);
            if (user.isPresent()) {
                GenericResponse<AppUserDTO> updated = new GenericResponse<>();
                String actualrole = user.get().getRole();
                user.get().setEliminado(true);
                user.get().setRole(actualrole+"-ELIMINADO");
                updated = save(user.get());
                usersDeleted.add(updated.getResult());
            }
        }
        result.setResult(usersDeleted);
        if (usersDeleted.size() == ids.size()) {
            result.setMessage("TODOS LOS USUARIOS ELIMINADOS");
            result.setCode(200);
        } else {
            result.setMessage("ERROR AL ELIMINAR USUARIOS");
            result.setCode(500);
        }
        return result;
    }

    @Override
    public GenericResponse<String> deleteAll() throws Exception {

        GenericResponse<String> result = new GenericResponse<>();
        try {
            // repository.deleteAll();
            result.setCode(200);
            result.setMessage("SUCCESS");
            result.setResult("ALL RECORDS DELETED");
        } catch (Exception e) {
            result.setCode(500);
            result.setMessage("ERROR");
            result.setResult("DELETION NOT COMPLETED");
        }

        return result;
    }

}
