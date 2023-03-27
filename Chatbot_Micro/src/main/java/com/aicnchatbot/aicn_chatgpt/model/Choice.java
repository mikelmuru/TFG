package com.aicnchatbot.aicn_chatgpt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Choice {
    private String text;
    private Integer index;
    private Integer logprobs;
    private String finish_reason;
}
