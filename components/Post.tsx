import { FC, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LikeButtonProps {
    isLiked: boolean;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
}

const LikeButton: FC<LikeButtonProps> = (props) => {
    if (props.isLiked) {
        return (
            <Image
                src="/heart-fill.png"
                width="30%"
                height="30%"
                className="cursor-pointer"
                onClick={() => props.setIsLiked(false)}
            />
        );
    }

    return (
        <Image
            src="/heart.png"
            width="30%"
            height="30%"
            className="cursor-pointer"
            onClick={() => props.setIsLiked(true)}
        />
    );
};

interface PostProps {
    author: string;
    authorImage: string;
    hashTags: any;
    content: string;
    likeCount: number;
    createdOn: string;
    index: number;
}

const Post: FC<PostProps> = (props) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

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

    return (
        <motion.div
            className="bg-white mb-6 mx-4 md:mx-0 p-4 rounded shadow font-serif relative"
            custom={props.index}
            initial="hidden"
            animate="visible"
            variants={variants}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={() => setIsLiked(true)}
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
            <ul className="flex flex-wrap my-3">
                {props.hashTags.map((hashTag, index) => (
                    <li
                        key={index}
                        className="mr-2 underline text-purple-900 hover:text-purple-500 cursor-pointer"
                    >
                        #{hashTag.name}
                    </li>
                ))}
            </ul>
            <div className="absolute p-2 -bottom-6 right-1/2 rounded-full bg-blue-100">
                <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
            </div>
        </motion.div>
    );
};

export default Post;
