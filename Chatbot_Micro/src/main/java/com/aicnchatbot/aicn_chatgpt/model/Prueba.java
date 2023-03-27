package com.aicnchatbot.aicn_chatgpt.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NonNull;

@Data
public class Prueba {

    @NonNull
    private String prompt;

    @JsonProperty
    private Integer size;
}
