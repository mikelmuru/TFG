package com.aicnchatbot.aicn_chatgpt.model;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Answer {
    String id;
    String object;
    LocalDate created;
    String model;
    List<Choice> choices;
    Usage usage;
}
