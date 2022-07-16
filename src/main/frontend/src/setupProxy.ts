const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const { HOST, PORT }: NodeJS.ProcessEnv = process.env;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://${HOST}:${PORT}`,
      changeOrigin: true,
    })
  );
};
