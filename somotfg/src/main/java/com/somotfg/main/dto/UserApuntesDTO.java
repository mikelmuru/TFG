package com.somotfg.main.dto;

import com.somotfg.main.model.Grado;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserApuntesDTO {
    private Long id;
    private String titulo;
    private Grado grado;
    private String descripcion;
}
