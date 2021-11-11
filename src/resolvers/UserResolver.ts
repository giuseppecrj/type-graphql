import { Resolver, Query, Arg, FieldResolver, Root, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { MyContext } from "../types/MyContext";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class UserResolver {
    @Query(() => String)
    async hello() {
        return "Hello World"
    }

    @Query(() => [User], { nullable: true })
    async users() {
        return await User.find()
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
        return await User.findOne({ _id: userId })
    }

    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuth)
    async currentUser(@Ctx() ctx: MyContext) {
        return await User.findOne({ _id: ctx.res.locals.userId })
    }

    @FieldResolver()
    async name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`
    }
}
