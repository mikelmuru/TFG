package com.somotfg.main.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.web.multipart.MultipartFile;

import com.somotfg.main.dto.ApunteDTO;
import com.somotfg.main.dto.ApunteNewDTO;
import com.somotfg.main.model.AppUser;
import com.somotfg.main.model.Apunte;
import com.somotfg.main.model.Asignatura;
import com.somotfg.main.repository.AppUserRepository;
import com.somotfg.main.repository.ApuntesRepository;
import com.somotfg.main.repository.AsignaturaRepository;
import com.somotfg.main.service.interfaze.IApunteService;
import com.somotfg.main.util.response.GenericResponse;

@Service
public class ApunteService implements IApunteService {

    @Autowired
    private ApuntesRepository repository;

    @Autowired
    private AppUserRepository userRepository;
    @Autowired
    private AsignaturaRepository asignaturaRepository;

    @Autowired
    private AwsS3Service s3Service;

    private final ModelMapper modelMapper;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    public ApunteService() {
        this.modelMapper = new ModelMapper();
    }

    // ===================****PRIVATE METHODS****===================
    private ApunteDTO model2dto(Apunte model) {
        ApunteDTO dto = new ApunteDTO();
        dto = modelMapper.map(model, ApunteDTO.class);

        dto.setGradoCod(model.getAsignatura().getGrado().getCod());
        dto.setGradoNombre(model.getAsignatura().getGrado().getNombre());
        dto.setAsignaturaCod(model.getAsignatura().getCod());
        dto.setAsignaturaNombre(model.getAsignatura().getNombre());
        dto.setAutor(model.getAutor().getUsername());

        return dto;
    }

    private Apunte dto2model(ApunteDTO dto) {
        Apunte model = new Apunte();
        model = modelMapper.map(dto, Apunte.class);

        Optional<AppUser> autor = userRepository.findByUsername(dto.getAutor());
        Optional<Asignatura> asignatura = asignaturaRepository.findByCod(dto.getAsignaturaCod());
        if (autor.isPresent() && asignatura.isPresent()) {
            model.setAutor(autor.get());
            model.setAsignatura(asignatura.get());
        }

        return model;
    }

    private Apunte newdto2model(ApunteNewDTO dto) {
        Apunte model = new Apunte();
        model = modelMapper.map(dto, Apunte.class);

        Date actual = new Date();
        Optional<AppUser> autor = userRepository.findByUsername(dto.getAutor());
        Optional<Asignatura> asignatura = asignaturaRepository.findByCod(dto.getAsignaturaCod());
        if (autor.isPresent() && asignatura.isPresent()) {
            model.setAutor(autor.get());
            model.setAsignatura(asignatura.get());
            model.setFecha(actual);
        }

        return model;
    }

    private ApunteDTO update (ApunteDTO original, ApunteDTO nuevo) {
        Class<ApunteDTO> clase = ApunteDTO.class;
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

    private GenericResponse<ApunteDTO> save(Apunte apunte) {
        GenericResponse<ApunteDTO> isSaved = new GenericResponse<>();
        try {
            Apunte saved = repository.save(apunte);
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

    // ===================****PUBLIC METHODS****===================

    // ===================****SEARCH METHODS****===================
    @Override
    public GenericResponse<List<ApunteDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception {
        Pageable pageable = PageRequest.of(offset, pageSize);
        List<Apunte> apuntes = repository.findAll(pageable).toList();
        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();

        List<ApunteDTO> helper = new ArrayList<>();
        for (Apunte apunte : apuntes) {
            helper.add(model2dto(apunte));
        }

        result.setResult(helper);
        result.setMessage("SUCCESS");
        result.setCode(200);

        return result;
    }

    @Override
    public GenericResponse<List<ApunteDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort)
            throws Exception {

        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();
        try {
            Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(fieldSort));
            List<Apunte> apuntes = repository.findAll(pageable).getContent();

            List<ApunteDTO> helper = new ArrayList<>();
            for (Apunte apunte : apuntes) {
                helper.add(model2dto(apunte));
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
    public GenericResponse<ApunteDTO> searchById(Long id) throws Exception {
        GenericResponse<ApunteDTO> result = new GenericResponse<>();
        Optional<Apunte> grado = repository.findById(id);

        if (grado.isPresent()) {
            result.setResult(model2dto(grado.get()));
            result.setMessage("SUCCESS");
            result.setCode(200);
        } else {
            result.setMessage("Not Found");
            result.setCode(404);
        }

        return result;
    }

    @Override
    public GenericResponse<List<ApunteDTO>> searchByUsername(String username) throws Exception {
        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();
        Optional<AppUser> autor = userRepository.findByUsername(username);
        List<ApunteDTO> apuntesdto = new ArrayList<>();

        if (autor.isPresent()) {
            List<Apunte> apuntes = repository.findByAutor(autor.get());
            for (Apunte apunte : apuntes) {
                ApunteDTO dto = model2dto(apunte);
                apuntesdto.add(dto);
            }
        }

        if (apuntesdto.size() == 0) {
            result.setMessage("NOT FOUND");
            result.setCode(404);
        } else {
            result.setResult(apuntesdto);
            result.setMessage("SUCCESS");
            result.setCode(200);
        }

        return result;
    }

    @Override
    public GenericResponse<List<ApunteDTO>> searchByAsignatura(String asignaturacod) throws Exception {
        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();
        // Asignatura asignaturamodel = modelMapper.map(asignatura, Asignatura.class);
        List<ApunteDTO> dtos = new ArrayList<>();

        // List<Apunte> apuntes = repository.findByAsignatura(asignaturamodel);
        List<Apunte> apuntes = repository.findByAsignaturaCod(asignaturacod);
        for (Apunte apunte : apuntes) {
            // ApunteDTO dto = modelMapper.map(apunte, ApunteDTO.class);
            ApunteDTO dto = model2dto(apunte);
            dtos.add(dto);
        }

        if (dtos.size() == 0) {
            result.setMessage("NOT FOUND");
            result.setCode(404);
        } else {
            result.setResult(dtos);
            result.setMessage("SUCCESS");
            result.setCode(200);
        }

        return result;
    }

    @Override
    public GenericResponse<List<ApunteDTO>> searchByFiltro(String filtro) throws Exception {
        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();

        List<Apunte> apuntes = repository.findByFiltro(filtro);
        List<ApunteDTO> dtos = new ArrayList<>();
        for (Apunte apunte : apuntes) {
            dtos.add(model2dto(apunte));
        }
        result.setResult(dtos);

        if (apuntes.size() == 0) {
            result.setMessage("NOT FOUND");
            result.setCode(404);
        } else {
            result.setMessage("SUCCESS");
            result.setCode(200);
        }

        return result;
    }

    // ===================****CREATE METHODS****===================

    // cuando se implemente la conexion con s3 actualizar para procesar el multipart y enviarlo a s3 y recibir la referencia
    @Override
    public GenericResponse<ApunteDTO> create(ApunteNewDTO apunteData, MultipartFile file) throws Exception {
        GenericResponse<ApunteDTO> result = new GenericResponse<>();
        GenericResponse<ApunteDTO> saved = new GenericResponse<>();
        String refS3 = "";

        try {
            saved = save(newdto2model(apunteData));
            if (saved.getCode() == 201) {
                refS3 = s3Service.uploadFile(file, apunteData.getCod());
                if (refS3 != "") {
                    ApunteDTO dtoWithS3 = new ApunteDTO();
                    dtoWithS3.setRefS3(refS3);
                    saved.setResult(update(saved.getResult(), dtoWithS3));
                    save(dto2model(saved.getResult()));
                } else {
                    repository.deleteById(saved.getResult().getId());
                    saved.setCode(500);
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        if (saved.getCode() == 201) {
            result.setResult(saved.getResult());
            result.setMessage("TODOS LOS APUNTES REGISTRADOS");
            result.setCode(201);
        } else {
            result.setMessage("ERROR AL REGISTRAR APUNTES");
            result.setCode(500);
        }

        return result;
    }

    // ===================****UPDATE METHODS****===================
    @Override
    public GenericResponse<ApunteDTO> update(ApunteDTO newdata) throws Exception {
        Optional<Apunte> apunte = repository.findById(newdata.getId());
        GenericResponse<ApunteDTO> result = new GenericResponse<>();
        if (apunte.isPresent()) {
            ApunteDTO original = model2dto(apunte.get());
            ApunteDTO fullNewData = update(original,newdata);
            log.info("NEW INFO:   " + fullNewData.toString());
            Apunte entity = dto2model(fullNewData);
            log.info("NEW ENTITY TO SAVE:    " + entity.toString());
            result = save(entity);
        }
        return result;
    }

    // ===================****DELETE METHODS****===================

    // Delete multiple por ids
    @Override
    public GenericResponse<List<ApunteDTO>> deleteById(List<Long> ids) throws Exception {
        GenericResponse<List<ApunteDTO>> result = new GenericResponse<>();
        List<ApunteDTO> apuntesDeleted = new ArrayList<>();

        for (Long id : ids) {
            Optional<Apunte> apunte = repository.findById(id);
            if (apunte.isPresent()) {
                ApunteDTO dto = new ApunteDTO();
                repository.deleteById(id);
                s3Service.deleteFile(apunte.get().getRefS3());
                dto = model2dto(apunte.get());
                apuntesDeleted.add(dto);
            }
        }
        result.setResult(apuntesDeleted);
        if (apuntesDeleted.size() == ids.size()) {
            result.setMessage("TODOS LOS APUNTES ELIMINADOS");
            result.setCode(200);
        } else {
            result.setMessage("ERROR AL ELIMINAR APUNTES");
            result.setCode(500);
        }
        return result;
    }

    @Override
    public GenericResponse<String> deleteAll() throws Exception {
        GenericResponse<String> result = new GenericResponse<>();
        try {
            repository.deleteAll();
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
