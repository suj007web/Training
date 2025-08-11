import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  mongo: {
    uri: process.env.MONGO_URI || '',
  },
  sessionSecret: process.env.SESSION_SECRET,
  environment: process.env.NODE_ENV || 'development',
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT!, 10) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '0711',
    database: process.env.POSTGRES_DATABASE || '',
    synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    autoLoadEntities: process.env.POSTGRES_AUTOLOAD_ENTITIES === 'true',
  },
}));
