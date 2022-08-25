const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const {
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT,
  REACT_APP_PRODUCTION_SERVER_HOST,
} = process.env;

const SERVER_HOST = // REACT_APP_SERVER_HOST;
  process.env.NODE_ENV !== "production"
    ? REACT_APP_SERVER_HOST
    : REACT_APP_PRODUCTION_SERVER_HOST;

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/images", {
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v1/payment/ready", {
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      // `https://kapi.kakao.com`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v1/papago/n2mt", {
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      // `https://openapi.naver.com`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/oauth", { 
      // /authorization 인가 코드 받기
      // /token 토큰 받기
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      // `https://openapi.naver.com`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v2/user/me", { // 사용자 정보 가져오기
      // target: `https://kapi.kakao.com`,
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      // `https://openapi.naver.com`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v1/user", { // /logout
      target: `http://${SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      // `https://openapi.naver.com`,
      changeOrigin: true,
    }),
  );
};
