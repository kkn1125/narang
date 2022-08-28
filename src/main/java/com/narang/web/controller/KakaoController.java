package com.narang.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class KakaoController {
  private final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
  private final String REQUEST_AUTH = "/oauth/authorize";

  @GetMapping("/oauth/authorize")
  public String authorize(@RequestParam("client_id") String client_id,
                          @RequestParam("redirect_uri") String redirect_uri,
                          @RequestParam("response_type") String response_type) {
    String apiURL = KAKAO_AUTH_URI + REQUEST_AUTH;

    Map<String, String> requestParams = new HashMap<>();
    requestParams.put("client_id", client_id);
    requestParams.put("redirect_uri", redirect_uri);
    requestParams.put("response_type", response_type);

    StringBuilder postParams = new StringBuilder();

    requestParams.forEach((String key, String value) -> {
      postParams.append(key + "=" + value + "&");
    });
    String resultParams = postParams.reverse().deleteCharAt(0).reverse().toString();

    return "redirect:" + apiURL + "?" + resultParams;
  }
}
