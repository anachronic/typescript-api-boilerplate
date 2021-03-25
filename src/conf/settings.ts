import { cleanEnv, num, str } from 'envalid'

export const settings = cleanEnv(process.env, {
  // Application secret key
  SECRET_KEY: str({ devDefault: 'my-super-secret-key-for-app--please-change-this' }),

  // database
  DATABASE_HOST: str(),
  DATABASE_PORT: num(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),

  // mailing with mailgun
  MAILGUN_API_KEY: str({ devDefault: 'fake mailgun api key ;)' }),
  MAILGUN_DOMAIN: str({ devDefault: 'fake mailgun domain ;)' }),
  MAIL_FROM: str({ default: 'Super app <no-reply@example.com>' }),

  // Redis
  REDIS_HOST: str({ devDefault: 'redis' }),
})
