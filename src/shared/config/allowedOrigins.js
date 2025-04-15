const { loadEnv } = require("../../shared/config/loadEnv");
loadEnv();

const allowedOrigins = [process.env.FRONTEND_URL];

module.exports = allowedOrigins;
