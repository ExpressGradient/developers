import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
            className="bg-white m-4 p-4 rounded shadow font-serif"
            custom={props.index}
            initial="hidden"
            animate="visible"
            variants={variants}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
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
            <p className="font-mono mt-2 text-lg md:text-2xl">
                {props.content}
            </p>
            <div className="flex mt-2">
                {props.hashTags.map((hashTag, index) => (
                    <p
                        className="text-purple-800 underline mr-3 md:text-lg"
                        key={index}
                    >
                        #{hashTag.name}
                    </p>
                ))}
            </div>
        </motion.div>
    );
};

export default Post;
