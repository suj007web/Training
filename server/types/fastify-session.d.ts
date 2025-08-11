import 'fastify';

declare module 'fastify' {
  interface Session {
    token?: string;
    id?: string;
  }

  interface FastifyRequest {
    destroySession: () => Promise<void>;
  }
}