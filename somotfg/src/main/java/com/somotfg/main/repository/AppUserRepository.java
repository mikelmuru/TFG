package com.somotfg.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.somotfg.main.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    
    Optional<AppUser> findByUsername(String username);

    // CAMBIAR LA CONSULTA CUANDO SE CONECTE A POSTGRESQL
    // lower(p.nombre) like lower(concat(:filtro,'%')) -> initcap(p.nombre) like concat(:filtro,'%')
    // lower(p.apellido) like lower(concat(:filtro,'%')) -> initcap(p.apellido) like concat(:filtro,'%')
    @Query("select p from AppUser p "
            + "where lower(p.username) like lower(concat('%',:filtro,'%')) "
            + "or lower(p.nombre) like lower(concat(:filtro,'%')) "
            + "or lower(p.apellido) like lower(concat(:filtro,'%'))")
    List<AppUser> findByFiltro(@Param("filtro") String filtro);

}
