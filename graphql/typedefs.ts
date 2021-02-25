import { gql } from "apollo-server-micro";

const typeDefs = gql`
    scalar DateTime

    type User {
        id: String
        name: String
        email: String
        image: String
        postsCreated: [Post]
        postsLiked: [Post]
    }

    type Post {
        id: String
        author: User
        likedBy: [User]
        content: String
        createdOn: DateTime
        hashTags: [HashTag]
    }

    type HashTag {
        id: String
        name: String
        postsUnderHashTag: [Post]
    }

    type Query {
        getPosts: [Post]
        getUsers: [User]
    }

    type Mutation {
        upsertUser(id: String, name: String, email: String, image: String): User
        createPost(
            postId: String
            content: String
            hashTagString: String
            userId: String
        ): Post
        toggleLike(
            postId: String
            userId: String
            currentLikeStatus: Boolean
        ): Post
    }
`;

export default typeDefs;
