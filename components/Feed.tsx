import { FC } from "react";
import useSWR from "swr";
import fetcher from "../components/fetcher";
import Post from "../components/Post";

const Feed: FC<any> = ({ propsData }) => {
    const { data, error } = useSWR(
        /* GraphQL */ `
            {
                posts {
                    id
                    content
                    author {
                        image
                        name
                    }
                    createdOn
                    likedBy {
                        id
                    }
                    hashTags {
                        name
                    }
                }
            }
        `,
        fetcher
    );

    return (
        <div className="mt-4">
            <h1 className="text-center font-serif text-3xl text-purple-800 md:text-5xl">
                Feed
            </h1>
            <ul className="md:w-1/2 mx-auto">
                {data
                    ? data.posts.map((post, index) => (
                          <Post
                              author={post.author.name}
                              content={post.content}
                              hashTags={post.hashTags}
                              likeCount={post.likedBy.length}
                              authorImage={post.author.image}
                              createdOn={post.createdOn}
                              key={post.id}
                              index={index}
                          />
                      ))
                    : "Loading"}
            </ul>
        </div>
    );
};

export default Feed;
