export const IS_DEV = process.env.NODE_ENV === "development" ? true : false;
export const IS_STAGING = process.env.ENV === "staging" ? true : false;
export const GRAPHQL_ENDPOINT = IS_DEV
  ? "http://localhost:3001"
  : IS_STAGING
  ? "staging"
  : "production";
export const MICRO_SERVICE_URI = "ADD_URL";
export const STRIPE_KEY = "ADD_KEY";
