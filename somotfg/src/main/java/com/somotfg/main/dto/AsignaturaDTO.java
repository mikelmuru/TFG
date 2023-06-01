package com.somotfg.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsignaturaDTO {
    
    private Long id;
    
    private String cod;
    private String nombre;
    private String gradoCod;
    private Integer curso;
}
