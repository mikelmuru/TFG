package com.somotfg.main.util.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenericResponse <T> {
    private T result;
    private String message;
    private Integer code;
}
