import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
  mongo_db_url: process.env.MONGO_DATABASE_URL,
  mongo_db_name: process.env.MONGO_DATABASE_NAME,
};

export const jwtConfig = {
  jwt_token: process.env.JWT_SECRET,
  expiresInMinutes: process.env.JWT_EXPIRES_MINUTES,
};

export const logger = {
  LOG_LEVEL: process.env.LOG_LEVEL,
};
