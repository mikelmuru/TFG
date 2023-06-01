package com.somotfg.main.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;

import com.somotfg.main.dto.ApunteDTO;
import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.dto.ExamenDTO;
import com.somotfg.main.model.Asignatura;
import com.somotfg.main.model.Grado;
import com.somotfg.main.repository.AsignaturaRepository;
import com.somotfg.main.repository.GradoRepository;
import com.somotfg.main.service.interfaze.IAsignaturaService;
import com.somotfg.main.util.response.GenericResponse;

@Service
public class AsignaturaService implements IAsignaturaService {

    @Autowired
    private AsignaturaRepository repository;

    @Autowired
    private GradoRepository gradoRepository;

    @Autowired
    private ApunteService apunteService;

    @Autowired
    private ExamenService examenService;

    private final ModelMapper modelMapper;

    private Logger log = LoggerFactory.getLogger(AsignaturaService.class);

    public AsignaturaService() {
        this.modelMapper = new ModelMapper();
    }

    // ===================****PRIVATE METHODS****===================
    private AsignaturaDTO model2dto(Asignatura model) {
        AsignaturaDTO dto = new AsignaturaDTO();
        dto = modelMapper.map(model, AsignaturaDTO.class);
        dto.setGradoCod(model.getGrado().getCod());
        return dto;
    }

    private Asignatura dto2model(AsignaturaDTO dto) {
        Asignatura model = new Asignatura();
        model = modelMapper.map(dto, Asignatura.class);

        Optional<Grado> grado = gradoRepository.findByCod(dto.getGradoCod());
        if (grado.isPresent()) {
            model.setGrado(grado.get());
        }
        return model;
    }

    private AsignaturaDTO update (AsignaturaDTO original, AsignaturaDTO nuevo) {
        Class<AsignaturaDTO> clase = AsignaturaDTO.class;
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

    private GenericResponse<AsignaturaDTO> save(Asignatura asignatura) {
        GenericResponse<AsignaturaDTO> isSaved = new GenericResponse<>();
        try {
            Asignatura saved = repository.save(asignatura);
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
    public GenericResponse<List<AsignaturaDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception {
        Pageable pageable = PageRequest.of(offset, pageSize);
        List<Asignatura> asignaturas = repository.findAll(pageable).toList();
        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();

        List<AsignaturaDTO> helper = new ArrayList<>();
        for (Asignatura asignatura : asignaturas) {
            helper.add(model2dto(asignatura));
        }
        result.setResult(helper);
        result.setMessage("SUCCESS");
        result.setCode(200);

        return result;
    }

    @Override
    public GenericResponse<List<AsignaturaDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort)
            throws Exception {

        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();
        try {
            Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(fieldSort));
            List<Asignatura> asignaturas = repository.findAll(pageable).getContent();

            List<AsignaturaDTO> helper = new ArrayList<>();
            for (Asignatura asignatura : asignaturas) {
                helper.add(model2dto(asignatura));
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
    public GenericResponse<AsignaturaDTO> searchByCod(String asignaturacod) throws Exception {
        GenericResponse<AsignaturaDTO> result = new GenericResponse<>();
        Optional<Asignatura> asignatura = repository.findByCod(asignaturacod);

        if (asignatura.isPresent()) {
            result.setResult(model2dto(asignatura.get()));
            result.setMessage("SUCCESS");
            result.setCode(200);
        } else {
            result.setMessage("Not Found");
            result.setCode(404);
        }

        return result;
    }

    @Override
    public GenericResponse<List<AsignaturaDTO>> searchByGrado(String gradocod) throws Exception {
        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();
        List<Asignatura> asignaturas = repository.findByGradoCod(gradocod);
        
        List<AsignaturaDTO> helper = new ArrayList<>();
        for (Asignatura asignatura : asignaturas) {
            helper.add(model2dto(asignatura));
        }

        result.setResult(helper);

        if (helper.size() > 0) {
            result.setCode(200);
            result.setMessage("SUCCESS");
        } else {
            result.setCode(404);
            result.setMessage("NOT FOUND");
        }

        return result;
    }

    @Override
    public GenericResponse<List<AsignaturaDTO>> searchByFiltro(String filtro) throws Exception {
        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();

        List<Asignatura> asignaturas = repository.findByFiltro(filtro);
        log.info(asignaturas.toString());
        List<AsignaturaDTO> dtos = new ArrayList<>();
        for (Asignatura asignatura : asignaturas) {
            dtos.add(model2dto(asignatura));
        }
        result.setResult(dtos);

        if (asignaturas.size() == 0) {
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
    public GenericResponse<List<AsignaturaDTO>> create(List<AsignaturaDTO> asignaturasData) throws Exception {
        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();
        List<AsignaturaDTO> helper = new ArrayList<>();

        Optional<Grado> grado = Optional.empty(); // helper comprobar grado dependencia
        GenericResponse<AsignaturaDTO> saved = new GenericResponse<>(); // helper variable donde guardamos el registro en cada iteracion

        for (AsignaturaDTO newAsignatura : asignaturasData) {
            grado = gradoRepository.findByCod(newAsignatura.getGradoCod());
            if (grado.isPresent()) {
                newAsignatura.setGradoCod(grado.get().getCod());
                try {
                    saved = save(dto2model(newAsignatura));
                    if (saved.getCode() == 201) {
                        helper.add(saved.getResult());
                    }
                } catch (UnexpectedRollbackException e) {
                    log.error(e.getMessage(), e);
                } catch (DataIntegrityViolationException e) { // Intento INUTIL de manejar los mensajes en el log
                    log.warn("Error de integridad de datos al registrar la asignatura: " + newAsignatura.getCod());
                } catch (Exception e) {
                    log.error("Error al registrar la asignatura: " + newAsignatura.getCod());
                }
            }
        }
        result.setResult(helper);
        if (helper.size() == asignaturasData.size()) {
            result.setMessage("TODAS LAS ASIGNATURAS REGISTRADAS");
            result.setCode(201);
        } else {
            result.setMessage("ERROR AL REGISTRAR ASIGNATURAS");
            result.setCode(500);
        }

        return result;
    }

    // ===================****UPDATE METHODS****===================
    @Override
    public GenericResponse<AsignaturaDTO> update(AsignaturaDTO newdata) throws Exception {
        Optional<Asignatura> asignatura = repository.findById(newdata.getId());
        GenericResponse<AsignaturaDTO> result = new GenericResponse<>();

        if (asignatura.isPresent()) {
            AsignaturaDTO original = model2dto(asignatura.get());
            AsignaturaDTO fullNewData = update(original,newdata);
            Asignatura entity = dto2model(fullNewData);
            result = save(entity);
        }
        return result;
    }

    // ===================****DELETE METHODS****===================

    // Delete multiple por ids
    @Override
    public GenericResponse<List<AsignaturaDTO>> deleteById(List<Long> ids) throws Exception {
        GenericResponse<List<AsignaturaDTO>> result = new GenericResponse<>();
        List<AsignaturaDTO> asignaturasDeleted = new ArrayList<>();

        for (Long id : ids) {
            Optional<Asignatura> asignatura = repository.findById(id);
            if (asignatura.isPresent()) {
                GenericResponse<List<ExamenDTO>> examenesToDelete = examenService.searchByAsignatura(model2dto(asignatura.get()).getCod());
                GenericResponse<List<ApunteDTO>> apuntesToDelete = apunteService.searchByAsignatura(model2dto(asignatura.get()).getCod());
                List<Long> idsExAp = new ArrayList<>();

                if (examenesToDelete.getCode() == 200) {
                    for (ExamenDTO examen : examenesToDelete.getResult()) {
                        idsExAp.add(examen.getId());
                    }
                    examenService.deleteById(idsExAp);
                }
                idsExAp.clear();
                if (apuntesToDelete.getCode() == 200) {
                    for (ApunteDTO apunte : apuntesToDelete.getResult()) {
                        idsExAp.add(apunte.getId());
                    }
                    apunteService.deleteById(idsExAp);
                }

                AsignaturaDTO dto = new AsignaturaDTO();
                repository.deleteById(id);
                dto = model2dto(asignatura.get());
                asignaturasDeleted.add(dto);
            }
        }
        result.setResult(asignaturasDeleted);
        if (asignaturasDeleted.size() == ids.size()) {
            result.setMessage("TODAS LAS ASIGNATURAS ELIMINADAS");
            result.setCode(200);
        } else {
            result.setMessage("ERROR AL ELIMINAR ASIGNATURAS");
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

    // Delete multiple por delete de grado padre
    // A ESTE METODO SOLO SE LE LLAMA DESDE EL GradoService.deleteById()
    @Override
    public GenericResponse<String> deleteFromGrado(List<AsignaturaDTO> asignaturasToDelete) throws Exception {
        GenericResponse<String> result = new GenericResponse<>();
        GenericResponse<List<AsignaturaDTO>> deleted = new GenericResponse<>();
        List<Long> ids = new ArrayList<>();

        for (AsignaturaDTO asig : asignaturasToDelete) {
            ids.add(asig.getId());
        }

        try {
            deleted = deleteById(ids);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            deleted.setResult(new ArrayList<>());
            deleted.setCode(500);
            deleted.setMessage(e.getMessage());
        }

        result.setCode(deleted.getCode());
        result.setMessage(deleted.getMessage());
        if (deleted.getCode() == 200) {
            result.setResult("SUCCESS");
        } else {
            result.setMessage("ERROR");
        }
        return result;
    }
}
