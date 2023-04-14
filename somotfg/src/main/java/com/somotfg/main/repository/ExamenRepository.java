package com.somotfg.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.somotfg.main.model.Examen;

public interface ExamenRepository extends JpaRepository<Examen, Long> {
    
}
