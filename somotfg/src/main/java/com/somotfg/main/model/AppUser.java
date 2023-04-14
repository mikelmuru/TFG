package com.somotfg.main.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // EL USERNAME LO CREARA EL MICROSERVICIO AUTOMATICAMENTE AL REGISTRAR EL USUARIO.
    // USERNAME = NOMBRE+INICIAL_APELLIDO_1+INICIAL_APELLIDO_2+NUMERO_ALETORIO(0-50)
    private String username;
    private String nombre;
    private String apellido;
    private Integer edad;
    private Grado grado;
}
