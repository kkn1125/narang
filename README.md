# Project Narang

개인의 감정을 케어하는 웹서비스

## 참여자

|[@ohoraming](https://github.com/ohoraming)|[@kkn1125](https://github.com/kkn1125)|
|---|---|
| <img src="https://avatars.githubusercontent.com/u/77590526?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/71887242?v=4" width="120" /> |

## 기획 목적

### 컨셉

자가감정케어서비스

### 기능

1. 안면인식
  - 로그인
  - 감정인식
  - 페이스아이디
2. 로그인 기능 (소셜 로그인 포함)
3. 일기쓰기 (게시판)
  - 맞춤법 api 조사해서 감정 판별
  - 사진/영상/음성만 업로드 (voice to text 조사 필요)
4. 판매 시스템
  - 감정 인식 -> 기분에 따라 굿즈 추천
  - 광고주 우선순위
5. 결제 시스템
  - 결제 시스템 구현 조사 필요
6. 분석 섹션
  - 이모션 그래프 (주, 월, 연 단위) - ref : chart.js

### 보류 기술

1. 영상편집
2. 화상채팅

### 사용기술

- aws 서버 배포

#### front-end

- react (typescript)
- react-router-dom
- mui + emotion - css 부분
- axios
- http-proxy-middleware
- face-api.js - 안면인식
- 맞춤법api (조사)
- dotenv - 환경변수
- formidable - 파일 업로드 라이브러리
- formik - form 데이터 검증 라이브러리
- chart.js - 이모션 그래프
- yup - form 데이터 검증
- prop-types - prop의 타입 검증

#### back-end

- spring boot
- lombok
- spring security

#### Database

- 개발 : MongoDB
- prod : mysql + jpa
---

> 참고자료

[프로젝트 초기화](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.1&packaging=jar&jvmVersion=11&groupId=com.narang&artifactId=web&name=web&description=selft-emotion-care&packageName=com.narang.web&dependencies=lombok,web,devtools,configuration-processor,mysql,data-mongodb,security,data-jpa)

[java8 vs java11](https://itkjspo56.tistory.com/201)

[face-api](https://github.com/justadudewhohacks/face-api.js)

[aws 배포방법](https://velog.io/@dsunni/AWS-EC2%EC%97%90-Spring-Boot-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

[jar 배포 방법](https://velog.io/@mooh2jj/springboot-jar%ED%8C%8C%EC%9D%BC-AWS-EC2%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)
