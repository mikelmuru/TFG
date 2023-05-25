package com.somotfg.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.somotfg.main.model.AppUser;
import com.somotfg.main.model.Apunte;
import com.somotfg.main.model.Asignatura;

public interface ApuntesRepository extends JpaRepository<Apunte, Long> {

    // MANTENEMOS ESTA OPCION TAMBIEN --> CL.ADMIN??
    List<Apunte> findByAsignatura(Asignatura asignatura);

    @Query("select p from Apunte p "
            + "where lower(p.asignatura.cod) like lower(concat(:cod,'%'))")
    List<Apunte> findByAsignaturaCod(String cod);

    List<Apunte> findByAutor(AppUser autor);

    // POSIBILIDAD DE BUSCAR POR ASIGNATURA Y COD SIN IMPORTAR MAYUS Y MINUS
    @Query("select p from Apunte p "
            + "where lower(p.cod) like lower(concat(:filtro,'%')) "
            + "or lower(p.asignatura.cod) like lower(concat(:filtro,'%')) ")
    List<Apunte> findByFiltro(@Param("filtro") String filtro);
}
