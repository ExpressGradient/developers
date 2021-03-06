import { FC } from "react";
import Post from "./Post";
import Tabs from "./Tabs";

const Feed: FC<any> = (props) => {
    return (
        <div className="mt-4">
            <Tabs />
            <div className="md:w-1/2 mx-auto">
                {props.posts
                    .slice(0)
                    .reverse()
                    .map((post, index) => (
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
                            refetchAction={props.refetchAction}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Feed;
