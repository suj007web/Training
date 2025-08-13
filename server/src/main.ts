import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/config.service';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter(),{
    logger: ['error', 'warn', 'log', 'debug'],
    
  });
  const configService = app.get(AppConfigService);

  // const fastify = app.getHttpAdapter().getInstance();

  // await fastify.register(fastifyCookie)

  // await fastify.register(fastifySession, {
  //   secret : configService.sessionSecret,
  //   cookie : {
  //     maxAge : 15 * 60 * 1000, 
  //     secure: configService.environment === 'production', 
  //   },
  //   store : MongoStore.create({
  //     mongoUrl: configService.mongoUri,
  //     ttl: 15 * 60,
  //     autoRemove: 'native',
  //   }),
  //   saveUninitialized: false,
  // })


  const port = configService.port;
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
