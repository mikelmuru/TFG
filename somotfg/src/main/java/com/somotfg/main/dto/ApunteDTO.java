package com.somotfg.main.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApunteDTO {
    private Long id;
    
    private String cod;
    private String gradoCod;
    private String gradoNombre;
    private String asignaturaCod;
    private String asignaturaNombre;
    private Date fecha;
    private String autor;

    private String refS3;
}
