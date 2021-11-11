import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'User' })
@Entity()
export class User extends BaseEntity {
    @Field({ description: "The profile _id" })
    @ObjectIdColumn()
    readonly _id: ObjectId;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column('text', { unique: true })
    email: string;

    @Field()
    name: string

    @Column()
    password: string
}
