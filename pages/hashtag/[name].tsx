import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC } from "react";
import LoadingFeed from "../../components/LoadingFeed";
import Post from "../../components/Post";

const GET_POSTS_UNDER_HASHTAG = gql`
    query GetPostsUnderHashTag($name: String) {
        getPostsUnderHashTag(name: $name) {
            id
            content
            createdOn
            author {
                id
                name
                image
            }
            hashTags {
                name
            }
            likedBy {
                id
            }
        }
    }
`;

const PostsUnderHashTag: FC = () => {
    const router = useRouter();
    const { name } = router.query;
    const { data, loading, refetch } = useQuery(GET_POSTS_UNDER_HASHTAG, {
        pollInterval: 1000,
        variables: { name },
    });

    if (loading) {
        return <LoadingFeed />;
    }

    if (!data) {
        return (
            <h1 className="text-xl text-purple-700 text-center">
                No post under {name}
            </h1>
        );
    }

    return (
        <div className="mt-4">
            <h1 className="text-2xl text-purple-700 text-center font-serif">
                Posts under <span className="text-purple-800">#{name}</span>
            </h1>
            <div className="mt-4 md:w-1/2 mx-auto">
                {data.getPostsUnderHashTag.map((post, index) => (
                    <Post
                        id={post.id}
                        author={post.author.name}
                        authorId={post.author.id}
                        authorImage={post.author.image}
                        hashTags={post.hashTags}
                        likedBy={post.likedBy}
                        createdOn={post.createdOn}
                        content={post.content}
                        index={index}
                        key={post.id}
                        refetchAction={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostsUnderHashTag;
