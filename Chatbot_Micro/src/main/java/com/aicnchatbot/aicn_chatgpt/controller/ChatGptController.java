package com.aicnchatbot.aicn_chatgpt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aicnchatbot.aicn_chatgpt.model.Answer;
import com.aicnchatbot.aicn_chatgpt.model.Call;
import com.aicnchatbot.aicn_chatgpt.service.ChatGptService;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST})
@RestController
@RequestMapping("/aicn/chatgpt")
public class ChatGptController {

    private Logger log = LoggerFactory.getLogger(ChatGptController.class);

    @Autowired
    ChatGptService chatgptService;

    @PostMapping("/askwithparam")
    public ResponseEntity<Call> sendPrompt(@RequestParam("prompt") Call prompt) throws Exception {
        log.info("Entro al controller");
        Answer answer = chatgptService.sendPrompt(prompt.getPrompt());
        return ResponseEntity.ok().body(new Call(answer.getChoices().get(0).getText()));
    }

    @PostMapping("/askwithbody")
    public ResponseEntity<Call> sendPrompt2(@RequestBody Call prompt) throws Exception {
        log.info("Entro al controller");
        Answer answer = chatgptService.sendPrompt(prompt.getPrompt());
        String myHelloWorld = "chatgptService.helloWorld()";
        return ResponseEntity.ok().body(new Call(answer.getChoices().get(0).getText() + myHelloWorld));
    }
}
