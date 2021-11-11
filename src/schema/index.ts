import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from 'mongodb'
import path from 'path';

import { UserResolver } from "../resolvers/UserResolver";
import { AuthResolver } from "../resolvers/AuthResolver";

import { ObjectIdScalar } from "./object-id.scalar";

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
    const schema = await buildSchema({
        // add all typescript resolvers
        resolvers: [
            UserResolver,
            AuthResolver
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        // use document converting middleware
        globalMiddlewares: [],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: true
    })

    return schema
}
