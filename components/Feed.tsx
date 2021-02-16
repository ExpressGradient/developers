import React, { FC, useEffect } from "react";
import useSWR from "swr";
import fetcher from "../components/fetcher";
import Post from "../components/Post";

const Feed: FC = () => {
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

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    });

    return (
        <div className="mt-4">
            <h1 className="text-center font-serif text-3xl text-purple-800 md:text-5xl">
                Feed
            </h1>
            <ul className="md:w-1/2 mx-auto">
                {data
                    ? data.posts.map((post) => (
                          <Post
                              author={post.author.name}
                              content={post.content}
                              hashTags={post.hashTags}
                              likeCount={post.likedBy.length}
                              authorImage={post.author.image}
                              createdOn={post.createdOn}
                              key={post.id}
                          />
                      ))
                    : "Loading"}
            </ul>
        </div>
    );
};

export default Feed;
