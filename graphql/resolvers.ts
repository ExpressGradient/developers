import { PrismaClient } from "@prisma/client";
import { GraphQLDateTime } from "graphql-iso-date";

const prisma = new PrismaClient();

interface UpsertUserArgs {
    id: string;
    name: string;
    email: string;
    image: string;
}

interface CreatePostArgs {
    postId: string;
    content: string;
    hashTagString: string;
    userId: string;
}

interface ToggleLikeArgs {
    postId: string;
    userId: string;
    currentLikeStatus: boolean;
}

const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        async getPosts() {
            return await prisma.post.findMany({
                include: { author: true, hashTags: true, likedBy: true },
            });
        },
        async getUsers() {
            return await prisma.user.findMany({
                include: { postsCreated: true, postsLiked: true },
            });
        },
    },
    Mutation: {
        async upsertUser(_parent, { id, name, email, image }: UpsertUserArgs) {
            return await prisma.user.upsert({
                where: { id },
                update: {
                    id,
                    name,
                    email,
                    image,
                },
                create: {
                    id,
                    name,
                    email,
                    image,
                },
            });
        },
        async createPost(
            _parent,
            { postId, content, hashTagString, userId }: CreatePostArgs
        ) {
            await prisma.post.create({
                data: {
                    id: postId,
                    content,
                    author: { connect: { id: userId } },
                },
            });

            const hashTags = hashTagString
                .split(",")
                .map((hashTag) => decodeURIComponent(hashTag.trim()));

            hashTags.forEach(
                async (hashTag) =>
                    await prisma.hashTag.upsert({
                        where: { name: hashTag },
                        create: {
                            name: hashTag.replace(/\s+/g, ""),
                            postsUnderHashTag: {
                                connect: { id: postId },
                            },
                        },
                        update: {
                            name: hashTag,
                            postsUnderHashTag: {
                                connect: { id: postId },
                            },
                        },
                    })
            );

            return prisma.post.findUnique({
                where: { id: postId },
                include: { author: true, hashTags: true, likedBy: true },
            });
        },
        async toggleLike(
            _parent,
            { postId, userId, currentLikeStatus }: ToggleLikeArgs
        ) {
            if (currentLikeStatus) {
                return await prisma.post.update({
                    where: { id: postId },
                    data: {
                        likedBy: { disconnect: { id: userId } },
                    },
                    include: { hashTags: true, likedBy: true, author: true },
                });
            } else {
                return await prisma.post.update({
                    where: { id: postId },
                    data: {
                        likedBy: { connect: { id: userId } },
                    },
                    include: { hashTags: true, likedBy: true, author: true },
                });
            }
        },
    },
};

export default resolvers;
