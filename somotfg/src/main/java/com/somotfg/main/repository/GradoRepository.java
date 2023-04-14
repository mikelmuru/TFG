package com.somotfg.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.somotfg.main.model.Grado;

public interface GradoRepository extends JpaRepository<Grado, Long> {
    
}
