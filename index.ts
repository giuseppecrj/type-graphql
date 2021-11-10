import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { PrismaClient } from '.prisma/client'
import createSchema from './schema'

const port = process.env.PORT || 8000

const main = async () => {
    const schema = await createSchema()

    const prisma = new PrismaClient()
    await prisma.$connect()

    const apolloServer = new ApolloServer({ schema })
    const app = express()
    apolloServer.applyMiddleware({ app })

    app.listen({ port }, () => {
        console.log(
            `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
        );
    });
}

main().catch(console.error)
