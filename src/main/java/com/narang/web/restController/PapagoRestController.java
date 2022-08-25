package com.narang.web.restController;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

// https://velog.io/@hellozin/Spring-API-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-PUT-DELETE-%EC%9A%94%EC%B2%AD-%EC%8B%9C-CORS-%EC%84%A4%EC%A0%95%EC%9D%B4-%EC%A0%81%EC%9A%A9-%EC%95%88%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0
// CORS allowedMethods 방법
// http://ojc.asia/bbs/board.php?bo_table=LecSpring&wr_id=446
// spring RequestHeader annotation 사용 참조

@RestController
public class PapagoRestController {

    private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source=ko&target=en&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
        try {
            con.setRequestMethod("POST");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

    @PostMapping("/v1/papago/n2mt")
    public String translate(@RequestParam("source") String source,
                            @RequestParam("target") String target,
                            @RequestParam("text") String text,
                            @RequestHeader("content-type") String CONTENT_TYPE,
                            @RequestHeader("x-naver-client-id") String CLIENT_ID,
                            @RequestHeader("x-naver-client-secret") String CLIENT_SECRET
                            ) {
        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        String sendText;
        try {
            sendText = URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Content-Type", CONTENT_TYPE);
        requestHeaders.put("X-Naver-Client-Id", CLIENT_ID);
        requestHeaders.put("X-Naver-Client-Secret", CLIENT_SECRET);
//        System.out.println(source);
//        System.out.println(target);
//        System.out.println(text);
//        System.out.println(CONTENT_TYPE);
//        System.out.println(CLIENT_ID);
//        System.out.println(CLIENT_SECRET);
        String responseBody = post(apiURL, requestHeaders, sendText);
        return responseBody;
    }
}
