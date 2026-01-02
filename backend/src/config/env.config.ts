export const dbConfig = {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
};

export const jwtConfig = {
  jwt_token: process.env.JWT_SECRET,
  expiresInMinutes: process.env.JWT_EXPIRES_MINUTES,
};

export const logger = {
  LOG_LEVEL: process.env.LOG_LEVEL,
};
