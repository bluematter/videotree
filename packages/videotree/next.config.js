module.exports = (phase, defaultConfig) => ({
  crossOrigin: "anonymous",
  env: {
    ENV: process.env.ENV,
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID
  }
});