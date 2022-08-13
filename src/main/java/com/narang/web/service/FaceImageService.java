package com.narang.web.service;

import com.narang.web.entity.FaceImage;
import com.narang.web.repository.FaceImageRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FaceImageService {
//    @Value("${dev.fileupload}")
    @Value("${prod.fileupload}")
    private String uploadPath;

    private FaceImageRepository faceRepository;

    @Autowired
    FaceImageService(FaceImageRepository faceRepository) {
        this.faceRepository = faceRepository;
    }

    public List<FaceImage> findAll() {
        return faceRepository.findAll();
    }

    public FaceImage findById(String id) {
        return faceRepository.findById(id).orElseThrow();
    }

    public List<FaceImage> findByUid(String uid) {
        return faceRepository.findByUid(uid);
    }

    public String insert(FaceImage face) {
        FaceImage newFace = faceRepository.insert(face);
        return newFace.getId();
    }

    public Map<String, Object> fileUpload(MultipartFile multipartFile, String id, String hashName) {
        File targetFile = new File(uploadPath
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

    public Boolean deleteById(String id) {
        faceRepository.deleteById(id);
        return true;
    }

    public Boolean deleteByUid(String uid) {
        faceRepository.deleteByUid(uid);
        return true;
    }

    public Boolean deleteByTwo(String uid, List<String> ids, String imgPath) {
        faceRepository.deleteByTwo(uid, ids);
        File file = new File(uploadPath + uid);
        System.out.println(file.isDirectory());
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            for (File f : files) {
                System.out.println(f.getName());
                if (f.getName().equals(imgPath)) {
                    if (f.delete()) {
                        System.out.println("파일을 성공적으로 삭제 했습니다.");
                    } else {
                        System.out.println("없는 파일 입니다.");
                    }
                }
            }
        }
        return true;
    }
}
