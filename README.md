# Project Narang

개인의 감정을 케어하는 웹서비스

## 참여자

| [@ohoraming](https://github.com/ohoraming)                                     | [@kkn1125](https://github.com/kkn1125)                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/77590526?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/71887242?v=4" width="120" /> |

## 기획

"Narang"서비스는 개개인의 일기를 작성하면서 감정을 분석하고 해석된 감정 데이터를 그래프로 변환하여 월, 주 단위로 자신을 관찰 가능하게 하는 감정 케어 서비스입니다.

주요 서비스는 일기를 작성하고, 일기의 내용을 분석하여 감정 데이터를 얻어 월, 주 단위로 그래프를 자동으로 작성합니다. 해당 데이터를 작성자가 활용하여 자신의 감정을 케어하는데 도움을 주기 위함이 목적이며, 로그인의 편의를 돕기 위해 안면 인식 로그인 기능을 고안하여 개발을 진행 했습니다.

## 컨셉

일기를 쓰다보면 자신도 모르게 묻어나는 감정을 찾아내어 그래프로 볼 수 있게 한다는 개념을 가지고 AI를 접목한 웹 서비스를 컨셉으로 가지고 있습니다.

## 서비스 목록

1. 안면 인식 로그인 (face-api.js detectFace)
2. 소셜 계정 로그인 (카카오 로그인 API)
3. 일기
   - 일기 내용을 기반으로 감정 판별
   - 감정 분석
   - 감정 분석 데이터 기반 그래프 (주, 월 단위) 생성

### 안면 인식 로그인

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187067717-01f33363-47a8-460e-8ed6-f86b043433ad.mp4" type="video/mp4"></video>

### 일기 쓰기 & 감정 분석 그래프

<video autoplay controls src="https://user-images.githubusercontent.com/71887242/187068070-8f8233ca-15d9-4e28-a62f-65799c1b1d0e.mp4" type="video/mp4"></video>

## 기술 스택

![image](https://user-images.githubusercontent.com/71887242/184470592-80216efb-7df5-4f29-8c2d-c8672fa65903.png)

### 개발 환경

1. common
   - babel
   - prettier
2. front-end
   - react
   - typescript
   - http-proxy-middleware
   - html-react-parser
   - formik
   - yup
   - jose
   - js-sha256
   - material-ui
   - emotion
   - kadvice
   - suneditor
   - react-cookie
   - react-dom
   - react-router-dom
   - chart.js
   - react-chartjs-2
   - dotenv
   - date-fns
   - axios
   - naver papago - 번역
3. back-end
   - Spring Boot
   - Spring Security
   - Json Web Token
   - Lombok
   - jackson data-bind
   - common-io
   - gradle
4. AI
   - sentiment - 텍스트 감정 분석
   - face-api.js - 안면 인식 + 감정 분석 + 인물 매칭
5. deploy
   - AWS EC2
   - NGINX
   - mobaXterm

## Database 명세서

- MongoDB v5.3.1
- Mongosh v1.1.7

![Database - narang drawio](https://user-images.githubusercontent.com/71887242/186116219-1740e0eb-f0cd-47a4-805d-44d7d258e721.png)

[Project Narang Database Docs](https://nova-darkness-84c.notion.site/DB-3b192585505d4940bcb214fda45ce07e)

## API 문서 & 명세서

[Project Narang API Docs](https://documenter.getpostman.com/view/16546987/VUqrPxhf)

<!--

---

> 참고자료

[프로젝트 초기화](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.1&packaging=jar&jvmVersion=11&groupId=com.narang&artifactId=web&name=web&description=selft-emotion-care&packageName=com.narang.web&dependencies=lombok,web,devtools,configuration-processor,mysql,data-mongodb,security,data-jpa)

[java8 vs java11](https://itkjspo56.tistory.com/201)

[face-api](https://github.com/justadudewhohacks/face-api.js)

[aws 배포방법](https://velog.io/@dsunni/AWS-EC2%EC%97%90-Spring-Boot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

[jar 배포 방법](https://velog.io/@mooh2jj/springboot-jar%ED%8C%8C%EC%9D%BC-AWS-EC2%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

-->
