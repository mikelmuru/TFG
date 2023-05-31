package com.somotfg.main.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.somotfg.main.model.AppUser;
import com.somotfg.main.repository.AppUserRepository;


@Service
public class SecurityService implements UserDetailsService{

    @Autowired
    private AppUserRepository userRepository;

    private Logger log = LoggerFactory.getLogger(SecurityService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> optUser = userRepository.findByUsername(username);

        log.info(optUser.get().toString());

        if (optUser.isPresent()) {
            AppUser user = optUser.get();
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRole()));

            return new User(user.getUsername(), user.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException(String.format("User '%s' not found in database.", username));
        }
    }
    
}
