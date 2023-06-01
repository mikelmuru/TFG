package com.somotfg.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserSingUpDTO {
    private String username;
    private String nombre;
    private String apellido;
    private String mail;
    private String role;
    private String password;
}
