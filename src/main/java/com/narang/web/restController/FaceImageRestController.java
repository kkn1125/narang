package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.FaceImage;
import com.narang.web.service.FaceImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FaceImageRestController {
    private FaceImageService faceService;

    @Autowired
    FaceImageRestController(FaceImageService faceService) {
        this.faceService = faceService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/faces")
    public String findAll() throws JsonProcessingException {
        return mapper(faceService.findAll());
    }

    @GetMapping("/face/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        return mapper(faceService.findByUid(uid));
    }

    @PostMapping("/face")
    public String insert(FaceImage face) {
        return faceService.insert(face);
    }

    @PostMapping("/fileupload")
    public Map<String, Object> fileupload(MultipartFile multipartFile, String id, String hashName) {

        return faceService.fileUpload(multipartFile, id, hashName);
    }

    @DeleteMapping("/face/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return faceService.deleteById(id);
    }

    @DeleteMapping("/face/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid, @RequestParam("ids") List<String> ids, @RequestParam("imgPath") String imgPath) {
        if (ids == null) {
            return faceService.deleteByUid(uid);
        } else {
            return faceService.deleteByTwo(uid, ids, imgPath);
        }
    }
    // https://stackoverflow.com/questions/17987380/combine-get-and-post-request-methods-in-spring 메서드 값 받아오기
}