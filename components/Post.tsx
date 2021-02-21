import { FC, useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gql, GraphQLClient } from "graphql-request";
import { UserContext } from "./UserContext";

interface LikeButtonProps {
    isLiked: boolean;
    actionToRun: () => void;
}

const LikeButton: FC<LikeButtonProps> = (props) => (
    <Image
        src={props.isLiked ? "/heart-fill.png" : "/heart.png"}
        alt="Post Like Image"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={props.actionToRun}
    />
);

interface PostProps {
    id: string;
    authorId: string;
    author: string;
    authorImage: string;
    hashTags: any;
    content: string;
    likedBy: any;
    createdOn: string;
    index: number;
}

const Post: FC<PostProps> = (props) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { user } = useContext(UserContext);
    const isLikedRef = useRef<boolean>(false);

    const likedUsers: string[] = props.likedBy.map((likedUser) => likedUser.id);
    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            if (likedUsers.includes(user.id)) {
                setIsLiked(true);
            }
        }
    }, [user]);

    const variants = {
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: i * 0.4,
                ease: "easeIn",
            },
        }),
        hidden: { opacity: 0 },
    };

    const handleLike = () => setIsLiked(!isLiked);

    useEffect(() => {
        if (isLikedRef.current && Object.keys(user).length !== 0) {
            const graphqlClient = new GraphQLClient("/api/graphql");
            const mutation = gql`
                mutation ${
                    isLiked ? "AddLike" : "RemoveLike"
                }($postId: String!, $userId: String!) {
                    ${
                        isLiked ? "addLike" : "removeLike"
                    }(postId: $postId, userId: $userId) {
                        id
                    }
                }
            `;
            graphqlClient.request(mutation, {
                postId: props.id,
                userId: user.id,
            });
        }
        isLikedRef.current = true;
    }, [isLiked]);

    return (
        <motion.div
            className="bg-white mb-6 mx-4 md:mx-0 p-4 rounded shadow font-serif relative"
            custom={props.index}
            initial="hidden"
            animate="visible"
            variants={variants}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleLike}
        >
            <div className="flex items-center">
                <Image
                    src={props.authorImage}
                    width="25%"
                    height="25%"
                    className="rounded-full col-span-1"
                />
                <p className="mx-2 md:text-lg">{props.author}</p>
                <p className="text-sm text-gray-500">on {props.createdOn}</p>
            </div>
            <p className="font-mono mt-2 text-lg break-words">
                {props.content}
            </p>
            <div className="flex flex-wrap my-3">
                {"{"}
                <p className="font-serif mx-2">
                    <span className="text-green-800">"likes": </span>
                    {props.likedBy.length},
                </p>
                <p className="font-serif text-green-800 mr-2">"hashTags": </p>
                <ul className="flex flex-wrap">
                    {props.hashTags.map((hashTag, index) => (
                        <li
                            key={index}
                            className="mr-2 underline text-purple-900 hover:text-purple-500 cursor-pointer"
                        >
                            #{hashTag.name}
                            {index + 1 !== props.hashTags.length ? "," : ""}
                        </li>
                    ))}
                </ul>
                {"}"}
            </div>
            <div className="absolute p-2 -bottom-6 right-1/2 rounded-full bg-blue-100">
                <LikeButton isLiked={isLiked} actionToRun={handleLike} />
            </div>
        </motion.div>
    );
};

export default Post;
