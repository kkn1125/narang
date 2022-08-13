const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/images", {
      target: `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v1/payment/ready", {
      target: `https://kapi.kakao.com`,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/v1/papago/n2mt", {
      target: `https://openapi.naver.com`,
      changeOrigin: true,
    }),
  );
};
