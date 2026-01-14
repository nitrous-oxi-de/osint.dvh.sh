/*
 * @file        src/index.ts
 * @author      David @dvhsh (https://dvh.sh)
 * @description Main entry point for osint.nitrous-oxi.de
 *
 * @project     nitrous-oxi-de/osint.nitrous-oxi.de
 * @created     Feb 23, 2025
 * @updated     Feb 23, 2025
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { APIEnvironment } from "@enum/eAPIEnvironment";
import pkg from "@package";

import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import rateLimit from "@fastify/rate-limit";
import compress from "@fastify/compress";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";

/////////////////////////////////////////////////////////////
//
// Fastify / Server Configuration
//
/////////////////////////////////////////////////////////////

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const HOST: string = '0.0.0.0';
const app: FastifyInstance = fastify({ logger: false });

/////////////////////////////////////////////////////////////
//
// Fastify / Server Routes
//
/////////////////////////////////////////////////////////////

import osintRoute from '@route/osint.route';
import apiRoute from '@route/api.route';

/////////////////////////////////////////////////////////////
//
// Environment Variables and Utilities
//
/////////////////////////////////////////////////////////////

const API_ENVIRONMENT: string = process.env.API_ENVIRONMENT as string;

const handleRateLimit = (env: string): number => {
  switch (env) {
    case APIEnvironment.Development:
      return 999;
    case APIEnvironment.Production:
      return 60;
    case APIEnvironment.Sandbox:
      return 100;
    default:
      return 0;
  }
};

const environmentCheck = (): void => {
  if (!API_ENVIRONMENT) {
    throw new Error("API_ENVIRONMENT is not defined");
  }
  if (!Object.values(APIEnvironment).includes(API_ENVIRONMENT as APIEnvironment)) {
    throw new Error("API_ENVIRONMENT is not a valid environment");
  }
};

/////////////////////////////////////////////////////////////
//
// Main Function - Server Start
//
/////////////////////////////////////////////////////////////

async function main(fastify: FastifyInstance): Promise<void> {
  environmentCheck();

  await fastify.register(rateLimit, {
    max: handleRateLimit(API_ENVIRONMENT),
    timeWindow: '1 minute'
  });

  fastify.register(compress);
  fastify.register(helmet);
  fastify.register(cors, {
    origin: [
      'https://osint.dvh.sh',
      'https://nitrous.dvh.sh',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
    preflight: true
  });

  await osintRoute(fastify);
  await apiRoute(fastify);

  await fastify.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  
  await fastify.ready();
}

main(app)
  .then(() => {
    console.log(`[${new Date().toLocaleString()}] [${pkg.version}/${API_ENVIRONMENT}] | Server started and listening at [${HOST}:${PORT}]`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Path: src/index.ts
