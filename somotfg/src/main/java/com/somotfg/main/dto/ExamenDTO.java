package com.somotfg.main.dto;

import java.util.Date;

import com.somotfg.main.model.Grado;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamenDTO {
    private Long id;
    private String descripcion;
    private Grado grado;
    private Date fecha;
}
