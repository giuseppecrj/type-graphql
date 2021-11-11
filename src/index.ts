import './env'
import "reflect-metadata";
import { createConnection } from "typeorm";
import createSchema from './schema'
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { GraphQLError, GraphQLFormattedError } from 'graphql';


const port = process.env.PORT || 8000

async function main() {
    try {
        await createConnection()

        // const connection = await createConnection()
        // console.log("Inserting a new user into the database...");
        // const user = new User();
        // user.firstName = "Timber";
        // user.lastName = "Saw";
        // user.age = 25;
        // await connection.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);

        // console.log("Loading users from the database...");
        // const users = await connection.manager.find(User);
        // console.log("Loaded users: ", users);

        const schema = await createSchema()
        const apolloServer = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            formatError: (error: GraphQLError): GraphQLFormattedError => {
                if (error && error.extensions) {
                    error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';
                }
                return error;
            }
        });
        const app = express()
        app.use(express.json())
        apolloServer.applyMiddleware({ app });

        app.listen({ port }, () => {
            console.log(
                `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
            );
        });
    } catch (error) {
        console.log(error)
    }
}

main()
