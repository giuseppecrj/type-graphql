import { Arg, Mutation, Resolver } from 'type-graphql'
import { UserResponse } from '../types/UserResponse'
import { User } from '../entity/User'
import { AuthInput } from '../types/AuthInput'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

@Resolver()
export class AuthResolver {
    @Mutation(() => UserResponse)
    async register(@Arg('input') input: AuthInput): Promise<UserResponse> {
        const hashedPassword = await bcrypt.hash(input.password, 10)
        const user = await User.create({ ...input, password: hashedPassword }).save()

        const payload = { id: user._id }
        const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312')

        return { user, token }
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(@Arg('input') input: AuthInput): Promise<UserResponse> {
        const user = await User.findOne({ email: input.email })
        if (!user) throw new Error('Invalid login')

        const valid = await bcrypt.compare(input.password, user.password)
        if (!valid) throw new Error('Invalid login')

        const payload = { id: user._id }
        const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312')

        return { user, token }
    }
}
