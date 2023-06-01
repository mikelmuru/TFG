package com.somotfg.main.service.interfaze;

import java.util.List;

import org.springframework.stereotype.Service;

import com.somotfg.main.dto.AsignaturaDTO;
import com.somotfg.main.util.response.GenericResponse;

@Service
public interface IAsignaturaService {
    // SEARCH METHODS
    // DE MOMENTO COMENTAMOS LOS METODOS DE BUSQUEDAS PAGINADAS Y CON FILTROS
    // SE HABILITAN EN CASO DE CONSOLA DE ADMINISTRADOR

    // List<AsignaturaDTO> searchAll() throws Exception;
    GenericResponse<List<AsignaturaDTO>> searchPagination(Integer offset, Integer pageSize) throws Exception;
    GenericResponse<List<AsignaturaDTO>> searchPaginationSorting(Integer offset, Integer pageSize, String fieldSort) throws Exception;
    GenericResponse<AsignaturaDTO> searchByCod(String asignaturacod) throws Exception;
    GenericResponse<List<AsignaturaDTO>> searchByFiltro(String filtro) throws Exception;
    GenericResponse<List<AsignaturaDTO>> searchByGrado(String grado) throws Exception;

    // SAVE METHODS
    GenericResponse<List<AsignaturaDTO>> create(List<AsignaturaDTO> asignaturasData) throws Exception;

    // UPDATE METHODS
    GenericResponse<AsignaturaDTO> update(AsignaturaDTO newdata) throws Exception;

    // DELETE METHODS
    GenericResponse<List<AsignaturaDTO>> deleteById(List<Long> ids) throws Exception;
    GenericResponse<String> deleteFromGrado(List<AsignaturaDTO> asignaturasToDelete) throws Exception;
    GenericResponse<String> deleteAll() throws Exception;
}

