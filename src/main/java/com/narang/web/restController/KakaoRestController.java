package com.narang.web.restController;

import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@RestController
public class KakaoRestController {
  private final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
  private final String KAKAO_API_URI = "https://kapi.kakao.com";
  private final String USER_INFO = "/v2/user/me";
  private final String LOGOUT = "/v1/user/logout";
  private final String UNLINK = "/v1/user/unlink";
  private final String TOKEN = "/oauth/token";

  private static String post(String apiUrl, Map<String, String> requestHeaders) {
    HttpURLConnection con = connect(apiUrl);
    try {
      con.setRequestMethod("POST");
      for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
        con.setRequestProperty(header.getKey(), header.getValue());
      }

      con.setDoOutput(true);

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

  private static String postWithParams(String apiUrl,
                                       Map<String, String> requestHeaders,
                                       Map<String, String> requestParams) {
    StringBuilder postParams = new StringBuilder();

    requestParams.forEach((String key, String value) -> {
      postParams.append(key + "=" + value + "&");
    });
    String resultParams = postParams.reverse().deleteCharAt(0).reverse().toString();
    HttpURLConnection con = connect(apiUrl);
    try {
      con.setRequestMethod("POST");
      for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
        con.setRequestProperty(header.getKey(), header.getValue());
      }

      con.setDoOutput(true);
      try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
        wr.write(resultParams.getBytes());
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

  @PostMapping("/v2/user/me")
  public String info(@RequestHeader("Authorization") String Authorization,
                     @RequestHeader("content-type") String contentType,
                     @RequestParam("secure_resource") String secure_resource,
                     @RequestParam("property_keys") String property_keys) {
    String apiURL = KAKAO_API_URI + USER_INFO;
    Map<String, String> requestHeaders = new HashMap<>();
    requestHeaders.put("Authorization", "Bearer " + Authorization);
    requestHeaders.put("Content-Type", contentType);

    Map<String, String> requestParams = new HashMap<>();
    requestParams.put("secure_resource", secure_resource);
    requestParams.put("property_keys", property_keys);

    String responseBody = postWithParams(apiURL, requestHeaders, requestParams);
    return responseBody;
  }

  @PostMapping("/oauth/token")
  public String token(@RequestParam("grant_type") String grant_type,
                      @RequestParam("client_id") String client_id,
                      @RequestParam("redirect_uri") String redirect_uri,
                      @RequestParam("code") String code) {
    String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
    String apiURL = KAKAO_AUTH_URI + TOKEN;

    Map<String, String> requestHeaders = new HashMap<>();
    requestHeaders.put("Content-Type", CONTENT_TYPE);

    Map<String, String> requestParams = new HashMap<>();
    requestParams.put("grant_type", grant_type);
    requestParams.put("client_id", client_id);
    requestParams.put("redirect_uri", redirect_uri);
    requestParams.put("code", code);

    String responseBody = postWithParams(apiURL, requestHeaders, requestParams);

    return responseBody;
  }

  @PostMapping("/v1/user/logout")
  public String logout(@RequestHeader("Authorization") String Authorization) {
    String unLinkURL = KAKAO_API_URI + UNLINK;

    Map<String, String> requestHeaders = new HashMap<>();
    requestHeaders.put("Authorization", "Bearer " + Authorization);
    String responseBody = post(unLinkURL, requestHeaders);
    System.out.println(responseBody);
    return responseBody;
  }
}
