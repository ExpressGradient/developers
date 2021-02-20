import { ApolloServer } from "apollo-server-micro";
import {
    queryType,
    mutationType,
    makeSchema,
    objectType,
    asNexusMethod,
    nonNull,
    stringArg,
} from "nexus";
import { join } from "path";
import { GraphQLDate } from "graphql-iso-date";
import { PrismaClient } from "@prisma/client";

export const GQLDate = asNexusMethod(GraphQLDate, "date");
const prisma = new PrismaClient();

const User = objectType({
    name: "User",
    definition(t) {
        t.string("id");
        t.string("name");
        t.nullable.string("email");
        t.nullable.string("image");
        t.list.field("postsCreated", {
            type: "Post",
            resolve: (parent) =>
                prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .postsCreated(),
        });
        t.list.field("postsLiked", {
            type: "Post",
            resolve: (parent) =>
                prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .postsLiked(),
        });
    },
});

const Post = objectType({
    name: "Post",
    definition(t) {
        t.string("id");
        t.nullable.field("author", {
            type: "User",
            resolve: (parent) =>
                prisma.post.findUnique({ where: { id: parent.id } }).author(),
        });
        t.list.field("likedBy", {
            type: "User",
            resolve: (parent) =>
                prisma.post.findUnique({ where: { id: parent.id } }).likedBy(),
        });
        t.string("content");
        t.date("createdOn");
        t.list.field("hashTags", {
            type: "HashTag",
            resolve: (parent) =>
                prisma.post.findUnique({ where: { id: parent.id } }).hashTags(),
        });
    },
});

const HashTag = objectType({
    name: "HashTag",
    definition(t) {
        t.string("id");
        t.string("name");
        t.list.field("postsUnderHashTag", {
            type: "Post",
            resolve: (parent) =>
                prisma.hashTag
                    .findUnique({ where: { id: parent.id } })
                    .postsUnderHashTag(),
        });
    },
});

const Query = queryType({
    definition(t) {
        t.list.field("users", {
            type: "User",
            resolve: (_) => prisma.user.findMany(),
        });
        t.list.field("posts", {
            type: "Post",
            resolve: (_) => prisma.post.findMany(),
        });
        t.list.field("hashTags", {
            type: "HashTag",
            resolve: (_) => prisma.hashTag.findMany(),
        });
    },
});

const Mutation = mutationType({
    definition(t) {
        t.field("upsertUser", {
            type: "User",
            args: {
                id: nonNull(stringArg()),
                name: nonNull(stringArg()),
                email: stringArg(),
                image: stringArg(),
            },
            resolve: (_, { id, name, email, image }, _ctx) =>
                prisma.user.upsert({
                    create: {
                        id,
                        name,
                        email,
                        image,
                    },
                    where: { id: id },
                    update: {
                        id,
                        name,
                        email,
                        image,
                    },
                }),
        });
        t.field("addLike", {
            type: "Post",
            args: {
                postId: nonNull(stringArg()),
                userId: nonNull(stringArg()),
            },
            resolve: (_, { postId, userId }, _ctx) =>
                prisma.post.update({
                    where: { id: postId },
                    data: {
                        likedBy: { connect: { id: userId } },
                    },
                }),
        });
        t.field("removeLike", {
            type: "Post",
            args: {
                postId: nonNull(stringArg()),
                userId: nonNull(stringArg()),
            },
            resolve: async (_, { postId, userId }, _ctx) =>
                prisma.post.update({
                    where: { id: postId },
                    data: {
                        likedBy: { disconnect: { id: userId } },
                    },
                }),
        });
    },
});

const schema = makeSchema({
    types: [Query, Mutation, User, Post, HashTag, GQLDate],
    outputs: {
        typegen: join(process.cwd(), "graphql-generated", "nexus-typegen.ts"),
        schema: join(process.cwd(), "graphql-generated", "schema.graphql"),
    },
});

export const config = { api: { bodyParser: false } };

const server = new ApolloServer({ schema });
export default server.createHandler({ path: "/api/graphql" });
