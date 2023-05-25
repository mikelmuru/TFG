package com.somotfg.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.somotfg.main.model.Asignatura;
import com.somotfg.main.model.Grado;

public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {
 
    List<Asignatura> findByGrado(Grado grado);

    @Query("select p from Asignatura p "
            + "where lower(p.grado.cod) like lower(:gradocod)")
    List<Asignatura> findByGradoCod(String gradocod);

    Optional<Asignatura> findByCod(String cod);

    // esta anotacion es para indicar que esta es una consulta de modificacion
    // por defecto @Query espera consultas de tipo select
    @Modifying
    @Query("delete from Asignatura p where lower(p.grado.cod) = lower(:gradocod)")
    void deleteByGradoCod(@Param("gradocod") String gradocod);

    // EN EL CASO DE GRADO NO SE CAMBIA DE LOWER A INITCAP
    // POSIBILIDAD DE BUSCAR POR NOMBRE Y COD SIN IMPORTAR MAYUS Y MINUS

    @Query("select p from Asignatura p "
            + "where lower(p.nombre) like lower(concat(:filtro,'%')) "
            + "or lower(p.cod) like lower(concat(:filtro,'%')) "
            + "or lower(p.grado.nombre) like lower(concat(:filtro,'%'))")
    List<Asignatura> findByFiltro(@Param("filtro") String filtro);
}
