package com.somotfg.main.dto;

import com.somotfg.main.model.Grado;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDTO {
    private Long id;

    // EL USERNAME LO CREARA EL MICROSERVICIO AUTOMATICAMENTE AL REGISTRAR EL USUARIO.
    // USERNAME = NOMBRE+INICIAL_APELLIDO_1+INICIAL_APELLIDO_2+NUMERO_ALETORIO(0-50)
    private String username;
    private String nombre;
    private String apellido;
    private Integer edad;
    private Grado grado;
}
