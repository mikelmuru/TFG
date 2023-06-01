package com.somotfg.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.somotfg.main.model.Grado;

public interface GradoRepository extends JpaRepository<Grado, Long> {
    
    Optional<Grado> findByCod(String cod);

    // EN EL CASO DE GRADO NO SE CAMBIA DE LOWER A INITCAP
    // POSIBILIDAD DE BUSCAR POR NOMBRE Y COD SIN IMPORTAR MAYUS Y MINUS
    @Query("select p from Grado p "
            + "where lower(p.nombre) like lower(concat(:filtro,'%')) "
            + "or lower(p.cod) like lower(concat(:filtro,'%')) ")
    List<Grado> findByFiltro(@Param("filtro") String filtro);
}
