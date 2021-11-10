import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import path from 'path';
import { PrismaClient } from "@prisma/client";

import { UserCrudResolver } from "prisma/generated/type-graphql";

interface Context {
    prisma: PrismaClient
}

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
    const schema = await buildSchema({
        // add all typescript resolvers
        resolvers: [],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        // use document converting middleware
        globalMiddlewares: [],
        // use ObjectId scalar mapping
        scalarsMap: [],
        validate: false
    })

    return schema
}
