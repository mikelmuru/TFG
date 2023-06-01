package com.somotfg.main.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


// import com.somotfg.main.dto.AppUserSingUpDTO;
// import com.somotfg.main.service.AppUserService;
import com.somotfg.main.service.SecurityService;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    @Autowired
    private SecurityService securityService;

    // @Autowired
    // private AppUserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        log.info("Cargo 'configure' Bean de SecurityConfig.");

        http = http.cors().and().csrf().disable();

        // CON ESTO SE DESHABILITADO EL ESTADO DE SESION -> NO SE GUARDA NINGUN TIPO DE INFORMACIÓN DE SESION
        // CONSECUENCIA: CADA PETICION HTTP DEBE DE INCLUIR TODA LA AUTORIZACION NECESARIA (TOKEN, USUARIO, CONTRASEÑA...)
        http = http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // AQUI MANEJAMOS LAS PETICIONES NO AUTENTICADAS
        http = http
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint(
                                ((request, response, authException) -> {
                                    log.warn("Unauthorized request");
                                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ha fallado la autenticacion de esta peticion, comprueba tus credenciales.");
                                })
                        ));

        http.authorizeHttpRequests()
                .requestMatchers("/somotfg/user/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/grado/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/asignatura/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/apunte/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/examenes/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/s3/**").hasAnyAuthority("alumno","profesor","admin")
                .requestMatchers("/somotfg/*/admin/**").hasAnyAuthority("admin")
                .requestMatchers("/somotfg/*/profesor/**").hasAnyAuthority("profesor","admin")
                .requestMatchers("/somotfg/*/open/**").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        log.info("Cargo 'authenticationManagerBean' Bean de SecurityConfig.");

        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.eraseCredentials(false)
                .userDetailsService(securityService)
                .passwordEncoder(passwordEncoder);

        return authenticationManagerBuilder.build();
    }


    // LO DEJAMOS COMENTADO POR QUE YA EXISTE EL USUARIO DEL ADMIN
    // @Bean
    // void createAdminUser() throws Exception {
    //     log.info("Entro a createDefUsers");
    //     AppUserSingUpDTO admin = new AppUserSingUpDTO();
    //     admin.setUsername("admin");
    //     admin.setNombre("admin");
    //     admin.setApellido("admin");
    //     admin.setMail("admin@mail.com");
    //     admin.setPassword("1234admin");
    //     admin.setRole("admin");
    //     userService.create(admin);
    // }

    

}
