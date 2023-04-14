package com.somotfg.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.somotfg.main.model.UserApuntes;

public interface UserApuntesRepository extends JpaRepository<UserApuntes, Long> {
    
}
