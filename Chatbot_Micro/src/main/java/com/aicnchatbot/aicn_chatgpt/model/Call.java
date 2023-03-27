package com.aicnchatbot.aicn_chatgpt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Call {
    private String model;
    @NonNull
    private String prompt;
    private Integer max_tokens;
    private Double temperature;
}
