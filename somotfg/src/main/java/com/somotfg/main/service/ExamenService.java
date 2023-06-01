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

import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.dto.ExamenNewDTO;
import com.somotfg.main.model.AppUser;
import com.somotfg.main.model.Asignatura;
import com.somotfg.main.model.Examen;
import com.somotfg.main.repository.AppUserRepository;
import com.somotfg.main.repository.AsignaturaRepository;
import com.somotfg.main.repository.ExamenRepository;
import com.somotfg.main.service.interfaze.IExamenService;
import com.somotfg.main.util.response.GenericResponse;

@Service
public class ExamenService implements IExamenService {

    @Autowired
    private ExamenRepository repository;

    @Autowired
    private AppUserRepository userRepository;
    @Autowired
    private AsignaturaRepository asignaturaRepository;

    @Autowired
    private AwsS3Service s3Service;

    private final ModelMapper modelMapper;

    private Logger log = LoggerFactory.getLogger(AppUserService.class);

    public ExamenService() {
        this.modelMapper = new ModelMapper();
    }

    // ===================****PRIVATE METHODS****===================
    private ExamenDTO model2dto(Examen model) {
        ExamenDTO dto = modelMapper.map(model, ExamenDTO.class);
    
        dto.setGradoCod(model.getAsignatura().getGrado().getCod());
        dto.setGradoNombre(model.getAsignatura().getGrado().getNombre());
        dto.setAsignaturaCod(model.getAsignatura().getCod());
        dto.setAsignaturaNombre(model.getAsignatura().getNombre());
        dto.setAutor(model.getAutor().getUsername());
    
        return dto;
    }
    
    private Examen dto2model(ExamenDTO dto) {
        Examen model = modelMapper.map(dto, Examen.class);
    
        Optional<AppUser> autor = userRepository.findByUsername(dto.getAutor());
        Optional<Asignatura> asignatura = asignaturaRepository.findByCod(dto.getAsignaturaCod());
        if (autor.isPresent() && asignatura.isPresent()) {
            model.setAutor(autor.get());
            model.setAsignatura(asignatura.get());
        }
    
        return model;
    }

    private Examen newdto2model(ExamenNewDTO dto) {
        Examen model = new Examen();
        model = modelMapper.map(dto, Examen.class);

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
    
    private ExamenDTO update (ExamenDTO original, ExamenDTO nuevo) {
        Class<ExamenDTO> clase = ExamenDTO.class;
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

    private GenericResponse<ExamenDTO> save(Examen apunte) {
        GenericResponse<ExamenDTO> isSaved = new GenericResponse<>();
        try {
            Examen saved = repository.save(apunte);
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
    public GenericResponse<List<ExamenDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception {
        Pageable pageable = PageRequest.of(offset, pageSize);
        List<Examen> exams = repository.findAll(pageable).toList();
        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();

        List<ExamenDTO> helper = new ArrayList<>();
        for (Examen exam : exams) {
            helper.add(model2dto(exam));
        }

        result.setResult(helper);
        result.setMessage("SUCCESS");
        result.setCode(200);

        return result;
    }

    @Override
    public GenericResponse<List<ExamenDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort)
            throws Exception {

        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();
        try {
            Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(fieldSort));
            List<Examen> exams = repository.findAll(pageable).getContent();

            List<ExamenDTO> helper = new ArrayList<>();
            for (Examen exam : exams) {
                helper.add(model2dto(exam));
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
    public GenericResponse<ExamenDTO> searchById(Long id) throws Exception {
        GenericResponse<ExamenDTO> result = new GenericResponse<>();
        Optional<Examen> exam = repository.findById(id);

        if (exam.isPresent()) {
            result.setResult(model2dto(exam.get()));
            result.setMessage("SUCCESS");
            result.setCode(200);
        } else {
            result.setMessage("Not Found");
            result.setCode(404);
        }

        return result;
    }

    @Override
    public GenericResponse<List<ExamenDTO>> searchByUsername(String username) throws Exception {
        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();
        Optional<AppUser> author = userRepository.findByUsername(username);
        List<ExamenDTO> examsDto = new ArrayList<>();

        if (author.isPresent()) {
            List<Examen> exams = repository.findByAutor(author.get());
            for (Examen exam : exams) {
                ExamenDTO dto = model2dto(exam);
                examsDto.add(dto);
            }
        }

        if (examsDto.size() == 0) {
            result.setMessage("NOT FOUND");
            result.setCode(404);
        } else {
            result.setResult(examsDto);
            result.setMessage("SUCCESS");
            result.setCode(200);
        }

        return result;
    }

    @Override
    public GenericResponse<List<ExamenDTO>> searchByAsignatura(String asignaturacod) throws Exception {
        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();
        List<ExamenDTO> dtos = new ArrayList<>();

        // List<Examen> examenes = repository.findByAsignatura(asignaturamodel);
        List<Examen> examenes = repository.findByAsignaturaCod(asignaturacod);
        for (Examen examen : examenes) {
            // ExamenDTO dto = modelMapper.map(examen, ExamenDTO.class);
            ExamenDTO dto = model2dto(examen);
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
    public GenericResponse<List<ExamenDTO>> searchByFiltro(String filter) throws Exception {
        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();

        List<Examen> exams = repository.findByFiltro(filter);
        List<ExamenDTO> dtos = new ArrayList<>();
        for (Examen exam : exams) {
            dtos.add(model2dto(exam));
        }
        result.setResult(dtos);

        if (exams.size() == 0) {
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
    public GenericResponse<ExamenDTO> create(ExamenNewDTO examData, MultipartFile file) throws Exception {
        GenericResponse<ExamenDTO> result = new GenericResponse<>();
        GenericResponse<ExamenDTO> saved = new GenericResponse<>();
        String refS3 = "";

        try {
            saved = save(newdto2model(examData));
            if (saved.getCode() == 201) {
                refS3 = s3Service.uploadFile(file, examData.getCod());
                if (refS3 != "") {
                    ExamenDTO dtoWithS3 = new ExamenDTO();
                    dtoWithS3.setRefS3(refS3);
                    saved.setResult(update(saved.getResult(), dtoWithS3));
                    save(dto2model(saved.getResult()));
                } else {
                    repository.deleteById(saved.getResult().getId());
                    saved.setCode(500);
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        if (saved.getCode() == 201) {
            result.setResult(saved.getResult());
            result.setMessage("TODOS LOS EXÁMENES REGISTRADOS");
            result.setCode(201);
        } else {
            result.setMessage("ERROR AL REGISTRAR EXÁMENES");
            result.setCode(500);
        }

        return result;
    }

    // ===================****UPDATE METHODS****===================
    @Override
    public GenericResponse<ExamenDTO> update(ExamenDTO newdata) throws Exception {
        Optional<Examen> exam = repository.findById(newdata.getId());
        GenericResponse<ExamenDTO> result = new GenericResponse<>();
        if (exam.isPresent()) {
            ExamenDTO original = model2dto(exam.get());
            ExamenDTO fullNewData = update(original, newdata);
            Examen entity = dto2model(fullNewData);
            result = save(entity);
        }
        return result;
    }

    // ===================****DELETE METHODS****===================

    // Delete multiple por ids
    @Override
    public GenericResponse<List<ExamenDTO>> deleteById(List<Long> ids) throws Exception {
        GenericResponse<List<ExamenDTO>> result = new GenericResponse<>();
        List<ExamenDTO> examsDeleted = new ArrayList<>();

        for (Long id : ids) {
            Optional<Examen> exam = repository.findById(id);
            if (exam.isPresent()) {
                ExamenDTO dto = new ExamenDTO();
                repository.deleteById(id);
                s3Service.deleteFile(exam.get().getRefS3());
                dto = model2dto(exam.get());
                examsDeleted.add(dto);
            }
        }
        result.setResult(examsDeleted);
        if (examsDeleted.size() == ids.size()) {
            result.setMessage("TODOS LOS EXÁMENES ELIMINADOS");
            result.setCode(200);
        } else {
            result.setMessage("ERROR AL ELIMINAR EXÁMENES");
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
