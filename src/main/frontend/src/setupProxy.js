const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const { HOST, PORT } = process.env;

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://${HOST}:${PORT}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/v1/payment/ready", {
      target: `https://kapi.kakao.com`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/v1/papago/n2mt", {
      target: `https://openapi.naver.com`,
      changeOrigin: true,
    })
  );
};
