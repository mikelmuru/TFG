package com.somotfg.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.somotfg.main.dto.DescargableDTO;
import com.somotfg.main.service.AwsS3Service;

@RestController
@RequestMapping("/somotfg/s3")
@CrossOrigin(
    origins = "*",
    methods = { RequestMethod.GET })
public class AwsS3Controller {

    @Autowired
    private AwsS3Service s3Service;

    @GetMapping("/getfile")
    public ResponseEntity<DescargableDTO> getFile(@RequestParam("filename") String filename) {
        DescargableDTO bytes = s3Service.downloadFile(filename);
        return ResponseEntity.ok().body(bytes);
    }
}
