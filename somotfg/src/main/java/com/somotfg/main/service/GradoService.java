package com.somotfg.main.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.dto.GradoDTO;
import com.somotfg.main.model.Grado;
import com.somotfg.main.repository.GradoRepository;
import com.somotfg.main.service.interfaze.IGradoService;
import com.somotfg.main.util.response.GenericResponse;

import jakarta.transaction.Transactional;

@Service
public class GradoService implements IGradoService {

    @Autowired
    private GradoRepository repository;

    @Autowired
    private AsignaturaService asignaturaService;

    private Logger log = LoggerFactory.getLogger(GradoService.class);

    // ===================****PRIVATE METHODS****===================
    private GradoDTO model2dto(Grado model) {
        GradoDTO dto = new GradoDTO();
        dto.setId(model.getId());
        dto.setNombre(model.getNombre());
        dto.setCod(model.getCod());
        return dto;
    }

    private Grado dto2model(GradoDTO dto) {
        Grado model = new Grado();
        model.setId(dto.getId());
        model.setNombre(dto.getNombre());
        model.setCod(dto.getCod());
        return model;
    }

    private GradoDTO update (GradoDTO original, GradoDTO nuevo) {
        Class<GradoDTO> clase = GradoDTO.class;
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

    private GenericResponse<GradoDTO> save(Grado grado) {
        GenericResponse<GradoDTO> isSaved = new GenericResponse<>();
        try {
            Grado saved = repository.save(grado);
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
    public List<GradoDTO> searchAll() throws Exception {
        // UTILIDAD DE ESTE METODO???
        throw new UnsupportedOperationException("Unimplemented method 'searchAll'");
    }

    @Override
    public GenericResponse<List<GradoDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception {
        Pageable pageable = PageRequest.of(offset, pageSize);
        List<Grado> grados = repository.findAll(pageable).toList();
        GenericResponse<List<GradoDTO>> result = new GenericResponse<>();

        List<GradoDTO> helper = new ArrayList<>();
        for (Grado grado : grados) {
            helper.add(model2dto(grado));
        }

        result.setResult(helper);
        result.setMessage("SUCCESS");
        result.setCode(200);

        return result;
    }

    @Override
    public GenericResponse<List<GradoDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort)
            throws Exception {

        GenericResponse<List<GradoDTO>> result = new GenericResponse<>();
        try {
            Pageable pageable = PageRequest.of(offset, pageSize).withSort(Sort.by(fieldSort));
            List<Grado> grados = repository.findAll(pageable).getContent();

            List<GradoDTO> helper = new ArrayList<>();
            for (Grado grado : grados) {
                helper.add(model2dto(grado));
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
    public GenericResponse<GradoDTO> searchById(Long id) throws Exception {
        GenericResponse<GradoDTO> result = new GenericResponse<>();
        Optional<Grado> grado = repository.findById(id);

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
    public GenericResponse<GradoDTO> searchByCod(String cod) throws Exception {
        GenericResponse<GradoDTO> result = new GenericResponse<>();
        Optional<Grado> grado = repository.findByCod(cod);

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
    public GenericResponse<List<GradoDTO>> searchByFiltro(String filtro) throws Exception {
        GenericResponse<List<GradoDTO>> result = new GenericResponse<>();

        List<Grado> grados = repository.findByFiltro(filtro);
        log.info(grados.toString());
        List<GradoDTO> dtos = new ArrayList<>();
        for (Grado grado : grados) {
            dtos.add(model2dto(grado));
        }
        result.setResult(dtos);

        if (grados.size() == 0) {
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
    public GenericResponse<List<GradoDTO>> create(List<GradoDTO> gradosData) throws Exception {
        GenericResponse<List<GradoDTO>> result = new GenericResponse<>();
        List<GradoDTO> helper = new ArrayList<>();
        GenericResponse<GradoDTO> saved = new GenericResponse<>(); // helper para guardar el resultado del repo

        for (GradoDTO newgrado : gradosData) {
            try {
                saved = save(dto2model(newgrado));
                if (saved.getCode() == 201) {
                    helper.add(saved.getResult());
                }
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
        result.setResult(helper);
        if (helper.size() == gradosData.size()) {
            result.setMessage("TODOS LOS GRADOS REGISTRADOS");
            result.setCode(201);
        } else {
            result.setMessage("ERROR AL REGISTRAR GRADOS");
            result.setCode(500);
        }

        return result;
    }

    // ===================****UPDATE METHODS****===================
    @Override
    public GenericResponse<GradoDTO> update(GradoDTO newdata) throws Exception {
        Optional<Grado> grado = repository.findById(newdata.getId());
        GenericResponse<GradoDTO> result = new GenericResponse<>();
        if (grado.isPresent()) {
            GradoDTO original = model2dto(grado.get());
            GradoDTO fullNewData = update(original, newdata);
            Grado entity = dto2model(fullNewData);
            result = save(entity);
        }
        return result;
    }

    // ===================****DELETE METHODS****===================

    // Delete multiple por ids
    @Override
    @Transactional
    public GenericResponse<List<GradoDTO>> deleteById(List<Long> ids) throws Exception {
        GenericResponse<List<GradoDTO>> result = new GenericResponse<>();
        List<GradoDTO> gradosDeleted = new ArrayList<>();

        for (Long id : ids) {
            Optional<Grado> grado = repository.findById(id);
            if (grado.isPresent()) {
                GradoDTO dto = new GradoDTO();
                GenericResponse<List<AsignaturaDTO>> asignaturasToDelete = asignaturaService.searchByGrado(grado.get().getCod());
                GenericResponse<String> resultDeleteAsignaturas = asignaturaService.deleteFromGrado(asignaturasToDelete.getResult());
                if (resultDeleteAsignaturas.getCode() == 200) {
                    repository.deleteById(id);
                    dto = model2dto(grado.get());
                    gradosDeleted.add(dto);
                }
            }
        }
        result.setResult(gradosDeleted);
        if (gradosDeleted.size() == ids.size()) {
            result.setMessage("TODOS LOS GRADOS ELIMINADOS");
            result.setCode(200);
        } else {
            result.setMessage("ERROR AL ELIMINAR GRADOS");
            result.setCode(500);
        }
        return result;
    }

    @Override
    @Transactional
    public GenericResponse<String> deleteAll() throws Exception {
        GenericResponse<String> result = new GenericResponse<>();
        try {
            asignaturaService.deleteAll();
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
