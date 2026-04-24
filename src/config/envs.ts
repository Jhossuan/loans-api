import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET_KEY: string;
  ALLOWED_ROUTES: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MONGO_URL: joi.string().required(),
  JWT_SECRET_KEY: joi.string().required(),
  ALLOWED_ROUTES: joi.string().required(),
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUrl: envVars.MONGO_URL,
  jwtSecretKey: envVars.JWT_SECRET_KEY,
  allowedRoutes: envVars.ALLOWED_ROUTES,
}