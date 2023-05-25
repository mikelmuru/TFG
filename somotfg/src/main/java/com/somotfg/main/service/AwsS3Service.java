package com.somotfg.main.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.somotfg.main.dto.DescargableDTO;

@Service
public class AwsS3Service {
    
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    private Logger log = LoggerFactory.getLogger(AwsS3Service.class);

    private File multipart2File(MultipartFile mltfile) throws IOException {
        File convFile = new File(mltfile.getOriginalFilename());
        FileOutputStream stream = new FileOutputStream(convFile);
        stream.write(mltfile.getBytes());
        stream.close();
        return convFile;
    }

    public String uploadFile(MultipartFile file, String cod) {
        String result = "";
        try {
            File myFile = multipart2File(file);
            String newFileName = cod + "_" + System.currentTimeMillis();
            log.info("Subiendo archivo " + newFileName + "...");
            // 3 parametros para crear el request: nombre del bucket - nombre/key del archivo - el archivo
            PutObjectRequest request = new PutObjectRequest(bucketName, newFileName, myFile);
            amazonS3.putObject(request);
            result = newFileName;
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
        return result;
    }

    public DescargableDTO downloadFile(String filename) {
        S3Object object = amazonS3.getObject(bucketName, filename);
        S3ObjectInputStream objectContent = object.getObjectContent();
        DescargableDTO result = new DescargableDTO();
        try {
            byte[] bytes = IOUtils.toByteArray(objectContent);
            result.setBytes(bytes);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return result;
    }

    public String deleteFile(String filename) {
        amazonS3.deleteObject(bucketName, filename);
        return "File deleted";
    }
}
