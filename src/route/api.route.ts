/*
 * @file api.route.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description API routing
 */
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import pkg                                               from "@package";

/*
    * @function apiRoute
    * @param { FastifyInstance } fastify
    * @description Registers API related endpoints
*/
async function apiRoute(fastify: FastifyInstance) {

    fastify.get("/api/version", async (req: FastifyRequest, res: FastifyReply) => { res.send({ version: pkg.version, environment: process.env.API_ENVIRONMENT }); });

}

export default apiRoute;

// Path: src/route/apiRoute.ts
