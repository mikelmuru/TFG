package com.somotfg.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.somotfg.main.model.AppUser;
import com.somotfg.main.model.Asignatura;
import com.somotfg.main.model.Examen;

public interface ExamenRepository extends JpaRepository<Examen, Long> {
    
    // MANTENEMOS ESTA OPCION TAMBIEN --> CL.ADMIN??
    List<Examen> findByAsignatura(Asignatura asignatura);

    @Query("select p from Examen p "
            + "where lower(p.asignatura.cod) like lower(concat(:cod,'%'))")
    List<Examen> findByAsignaturaCod(String cod);

    List<Examen> findByAutor(AppUser autor);

    Optional<Examen> findByCod(String cod);

    // POSIBILIDAD DE BUSCAR POR ASIGNATURA Y COD SIN IMPORTAR MAYUS Y MINUS
    @Query("select p from Examen p "
            + "where lower(p.cod) like lower(concat(:filtro,'%')) "
            + "or lower(p.asignatura.cod) like lower(concat(:filtro,'%')) ")
    List<Examen> findByFiltro(@Param("filtro") String filtro);
}
