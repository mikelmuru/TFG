package com.aicnchatbot.aicn_chatgpt.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.aicnchatbot.aicn_chatgpt.controller.ChatGptController;
import com.aicnchatbot.aicn_chatgpt.model.Answer;
import com.aicnchatbot.aicn_chatgpt.model.Call;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.observation.annotation.Observed;

@Observed(name = "chatGptService")
@Service
public class ChatGptService {

    @Autowired
    MeterRegistry meterRegistry;

    private Logger log = LoggerFactory.getLogger(ChatGptController.class);

    @Autowired
    private ObjectMapper jsonMapper;

    @Value("${openai.model}")
    private String model;
    @Value("${openai.maxTokens}")
    private Integer max_tokens;
    @Value("${openai.temperature}")
    private Double temperature;
    @Value("${openai.apikey}")
    private String openaiApiKey;
    @Value("${openai.url}")
    private String URL;

    private final HttpClient client = HttpClient.newHttpClient();

    public String sendChatgptRequest(String body) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(URL))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .POST(HttpRequest.BodyPublishers.ofString(body)).build();
        return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
    }

    @Observed(
            name = "chatGptService.sendprompt",
            contextualName = "getting-requested-prompt",
            lowCardinalityKeyValues = {"prompt", "userPrompt"}
            )
    public Answer sendPrompt(String prompt) throws Exception {
        Call call = new Call(model,prompt,max_tokens,temperature);
        log.info("Creo la call. Info pre sendChatgptRequest. Prompt: " + prompt);


        Gauge.builder("chatGptService.lastPrompt",
                        max_tokens,
                        Integer::intValue)
                        .description(prompt)
                        .register(meterRegistry);


        String responseBody = sendChatgptRequest(jsonMapper.writeValueAsString(call));
        log.info("ChatGPT devuelve respuesta.");
        Answer answer = jsonMapper.readValue(responseBody, Answer.class);
        return answer;
    }

    public String helloWorld() {
        return "Hello World!";
    }
}
