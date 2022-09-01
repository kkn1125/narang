# Project Narang

<p align="center">
개인의 감정을 케어하는 웹서비스
</p>

<div align="center">
   <img src="https://user-images.githubusercontent.com/71887242/187703475-d9c52cbd-747b-40d9-a730-a15adef3eafc.png" alt="project narang">
</div>

## Demo site

[https://narang.ml](https://narang.ml)

## 참여자

| [@ohoraming](https://github.com/ohoraming)                                     | [@kkn1125](https://github.com/kkn1125)                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/77590526?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/71887242?v=4" width="120" /> |

---

## 기획

"Narang"서비스는 일기를 작성하면서 감정을 분석하고 해석된 감정 데이터를 그래프로 변환하여 주 단위로 자신을 관찰하는 감정 케어 서비스입니다.

## 컨셉

1. TXT  
   네이버 파파고 API로 일기 내용을 번역하고, 번역된 내용을 sentiment 라이브러리로 감정 분석합니다. 일기 하단에는 일기 전체의 감정을 나타내는 이모지를 표시합니다.
2. AI  
   등록된 안면 이미지를 조회하여 AI기술을 통해 사용자와 일치 여부를 판별하고, 간편하게 로그인합니다. 안면 인식 로그인은 프로필에서 자신의 사진을 업로드하면 자동 활성화 됩니다.
3. GRAPH  
   분석된 감정 데이터는 Chart.js를 이용해 그래프로 표시합니다. 그래프를 통해 나의 감정을 케어하는 서비스를 사용할 수 있습니다.

## 서비스 목록

1. 안면 인식 로그인 (face-api.js detectFace)
2. 소셜 계정 로그인 (카카오 로그인 API)
3. 일기
   - 일기 내용을 기반으로 감정 판별
   - 감정 분석
   - 감정 분석 데이터 기반 그래프 (주 단위) 생성

### 안면 인식 로그인

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187067717-01f33363-47a8-460e-8ed6-f86b043433ad.mp4" type="video/mp4"></video>

### 일기 쓰기 & 감정 분석 그래프

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187068070-8f8233ca-15d9-4e28-a62f-65799c1b1d0e.mp4" type="video/mp4"></video>

### 댓글 + 좋아요

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187712000-b75ae935-cd3e-4e77-8f1f-29d009005b18.mp4" type="video/mp4"></video>

### 멘션 확인

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187711949-3dd7f7c9-bb1e-4306-be47-2abde75664ab.mp4" type="video/mp4"></video>

| 웹 예시                                                                                                                                   | 소셜 로그인                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ![웹 예시](https://user-images.githubusercontent.com/71887242/187704944-70d27ea9-02f3-4ff3-8e45-7e2b1e7379ca.gif)                         | ![카카오_로그인_짧음](https://user-images.githubusercontent.com/71887242/187705701-f7ff4457-1835-4c22-9a00-5e39c5e7741a.gif) |
| 안면 로그인 정확도 테스트                                                                                                                 | \-                                                                                                                           |
| ![안면로그인_정확도_테스트_저용량](https://user-images.githubusercontent.com/71887242/187865348-3b9b3cd3-b790-4e45-aac9-c8439b61ea92.gif) | \-                                                                                                                           |

## 기술 스택

![image](https://user-images.githubusercontent.com/71887242/184470592-80216efb-7df5-4f29-8c2d-c8672fa65903.png)

### 개발 환경

1. Common
   - babel 7.18.10
   - prettier 2.7.1
2. Front-end
   - react 18.2.0
   - typescript 4.8.2
   - http-proxy-middleware 2.0.6
   - html-react-parser 3.0.1
   - formik 2.2.9
   - yup 0.32.11
   - jose 4.8.3
   - js-sha256 0.9.0
   - material-ui 5.10.2
   - emotion 11.10.0
   - kadvice 1.0.10
   - suneditor 2.43.14
   - react-cookie 4.1.1
   - react-dom 18.2.0
   - react-router-dom 6.3.0
   - chart.js 3.8.2
   - react-chartjs-2 4.3.1
   - dotenv 16.0.1
   - date-fns 2.29.1
   - axios 0.27.2
   - naver papago - 번역
3. Back-end
   - java openJDK 11
   - Spring Boot 2.7.1
   - Spring Security 5.7.2
   - Json Web Token 0.11.5
   - Lombok 1.18.24
   - jackson data-bind 2.13.3
   - common-io 2.11.0
   - gradle 7.4.2
4. AI
   - sentiment - 텍스트 감정 분석 5.0.2
   - face-api.js - 안면 인식 + 감정 분석 + 인물 매칭 0.22.2
5. Deploy
   - AWS EC2
   - NGINX 1.20.1
   - mobaXterm

## Database 명세서

- MongoDB v5.3.1
- Mongosh v1.1.7

![Database - narang drawio](https://user-images.githubusercontent.com/71887242/186116219-1740e0eb-f0cd-47a4-805d-44d7d258e721.png)

[Project Narang Database Docs](https://nova-darkness-84c.notion.site/DB-3b192585505d4940bcb214fda45ce07e)

## API 문서 & 명세서

[Project Narang API Docs](https://documenter.getpostman.com/view/16546987/VUqrPxhf)

## Mock Image

![Mock Image](https://user-images.githubusercontent.com/71887242/187711500-a3a0262a-834c-4cdf-b6f9-f7c4cc6057b8.png)

<!--

---

> 참고자료

[프로젝트 초기화](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.1&packaging=jar&jvmVersion=11&groupId=com.narang&artifactId=web&name=web&description=selft-emotion-care&packageName=com.narang.web&dependencies=lombok,web,devtools,configuration-processor,mysql,data-mongodb,security,data-jpa)

[java8 vs java11](https://itkjspo56.tistory.com/201)

[face-api](https://github.com/justadudewhohacks/face-api.js)

[aws 배포방법](https://velog.io/@dsunni/AWS-EC2%EC%97%90-Spring-Boot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

[jar 배포 방법](https://velog.io/@mooh2jj/springboot-jar%ED%8C%8C%EC%9D%BC-AWS-EC2%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

-->
