package com.somotfg.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.somotfg.main.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    
}
