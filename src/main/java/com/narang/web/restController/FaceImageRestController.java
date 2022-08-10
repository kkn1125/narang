package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narang.web.entity.FaceImage;
import com.narang.web.service.FaceImageService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FaceImageRestController {
    private FaceImageService faceService;

    @Autowired
    FaceImageRestController(FaceImageService faceService) {
        this.faceService = faceService;
    }

    @GetMapping("/faces")
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(faceService.findAll());
        return mapper.writeValueAsString(faceService.findAll());
    }

    @GetMapping("/face/{uid}")
    public String findOne(@PathVariable("uid") String uid) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(faceService.findByUid(uid));
        return mapper.writeValueAsString(faceService.findByUid(uid));
    }

    @PostMapping("/face")
    public String insert(FaceImage face) {
        return faceService.insert(face);
    }

    @PostMapping("/fileupload")
    public Map<String, Object> fileupload(MultipartFile multipartFile, String id, String hashName) {
        File targetFile = new File("src/main/frontend/src/upload/"
                + id
                + "/" + hashName);
        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        Map<String, Object> m = new HashMap<>();
        return m;
    }

    @DeleteMapping("/face/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        faceService.deleteById(id);
        return true;
    }

    @DeleteMapping("/face/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid, @RequestParam("ids") List<String> ids) {
        System.out.println(uid);
        System.out.println(ids);
        if (ids == null) {
            faceService.deleteByUid(uid);
        } else {
            faceService.deleteByTwo(uid, ids);
        }
        return true;
    }
    // https://stackoverflow.com/questions/17987380/combine-get-and-post-request-methods-in-spring 메서드 값 받아오기
}