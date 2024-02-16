export const PORT = process.env.PORT ?? 8000;

export const DATABASE_URI =
  process.env.DATABASE_URI ?? "mongodb://127.0.0.1:27017/auth_app";

// Access token and refresh token secrets
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "2c9020d44b2719c4687a30e7f44f3bd";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "df5c88d863a00a2b7b775404f2cb6e5";

// Token expiration times for access and refresh tokens, with default values if not provided through environment variables
export const ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? "30m";
export const REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? "10d";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split?.(",") ?? [
  "http://localhost:3000",
];
// CORS options specifying allowed origins, methods, credentials, and options success status
export const CORS_OPTIONS = {
  origin: function (origin, callback) {
    // Check if the request origin is allowed, otherwise, raise an error
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("This origin is not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
