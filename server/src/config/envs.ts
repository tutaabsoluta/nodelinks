import 'dotenv/config'
import env from 'env-var'


export const envs = {

    PORT: env.get('PORT').required().asPortNumber(),

    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),

    JWT_SEED: env.get('JWT_SEED').required().asString(),

    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

    WEB_SERVICE_URL: env.get('WEB_SERVICE_URL').required().asString(),

    FRONTEND_URL: env.get('FRONTEND_URL').required().asString(),
    

    CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
};