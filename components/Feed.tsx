import { FC } from "react";
import Post from "../components/Post";

const Feed: FC<any> = ({ data }) => {
    return (
        <div className="mt-4">
            <h1 className="text-center font-serif text-3xl text-purple-800 mb-3 md:text-4xl">
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
