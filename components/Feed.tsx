import { FC } from "react";
import Post from "../components/Post";

const Feed: FC<any> = ({ data }) => {
    return (
        <div className="mt-4">
            <h1 className="text-center font-serif text-3xl text-purple-800 mb-3 md:text-4xl">
                Feed
            </h1>
            <div className="md:w-1/2 mx-auto">
                {data
                    ? data.posts
                          .slice(0)
                          .reverse()
                          .map((post, index) => {
                              return (
                                  <Post
                                      id={post.id}
                                      authorId={post.author.id}
                                      author={post.author.name}
                                      content={post.content}
                                      hashTags={post.hashTags}
                                      likedBy={post.likedBy}
                                      authorImage={post.author.image}
                                      createdOn={post.createdOn}
                                      key={post.id}
                                      index={index}
                                  />
                              );
                          })
                    : "Loading"}
            </div>
        </div>
    );
};

export default Feed;
