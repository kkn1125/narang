# Project Narang

개인의 감정을 케어하는 웹서비스

## 참여자

|[@ohoraming](https://github.com/ohoraming)|[@kkn1125](https://github.com/kkn1125)|
|---|---|
| <img src="https://avatars.githubusercontent.com/u/77590526?v=4" width="120" /> | <img src="https://avatars.githubusercontent.com/u/71887242?v=4" width="120" /> |

## 기획

"Narang"서비스는 개개인의 일기를 작성하면서 감정을 분석하고 해석된 감정 데이터를 그래프로 변환하여 연, 월, 주 단위로 자신을 관찰 가능하게 하는 감정 케어 서비스입니다.

주요 서비스는 일기를 작성하고, 일기의 내용을 분석하여 감정 데이터를 얻어 연, 월, 주 단위로 그래프를 자동으로 작성합니다. 해당 데이터를 작성자가 활용하여 자신의 감정을 케어하는데 도움을 주기 위함이 목적이며, 로그인의 편의를 돕기 위해 안면 인식 로그인 기능을 고안하여 개발을 진행 했습니다.

### 컨셉

감정 케어 웹 서비스

### 기술 스택

![image](https://user-images.githubusercontent.com/71887242/184310200-dfd9091c-7937-4f47-b2fd-074d6608c0c9.png)

### 서비스 목록

1. 안면 인식 로그인
2. 소셜 계정 로그인
3. 일기
  - 일기 내용을 기반으로 감정 판별
  - 감정 분석
  - 감정 분석 데이터 기반 그래프 (주, 월, 연 단위) 생성
4. 판매 시스템
  - 감정 인식 -> 감정 점수에 따라 상품 추천
5. 결제 시스템

### 개발 환경

1. back-end
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
