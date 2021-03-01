import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface HashTagProps {
    id: string;
    name: string;
    postsUnderHashTag: string[];
}

interface TrendingListProps {
    hashTags: HashTagProps[];
}

const HashTag: FC<HashTagProps> = (props) => {
    const [isHovered, setHovered] = useState<boolean>(false);
    const router = useRouter();

    return (
        <motion.div
            className={`bg-white mb-4 mx-4 md:mx-0 p-4 rounded shadow font-serif cursor-pointer ${
                isHovered &&
                "bg-purple-700 transform translate-x-4 -translate-y-2 duration-150 ease-in-out active:transform active:-translate-x-2"
            }`}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => router.push(`/hashtag/${props.name}`)}
        >
            <h3
                className={`text-lg md:text-xl ${
                    isHovered ? "text-white" : "text-purple-700"
                }`}
            >
                #{props.name}
            </h3>
            <p
                className={`font-mono md:text-lg ${
                    isHovered ? "text-gray-100" : "text-gray-700"
                }`}
            >
                {"{ "}
                <span
                    className={isHovered ? "text-green-200" : "text-green-800"}
                >
                    "postsUnderHashTag"
                </span>
                : {props.postsUnderHashTag.length}
                {" }"}
            </p>
        </motion.div>
    );
};

const TrendingList: FC<TrendingListProps> = (props) => {
    return (
        <div className="md:w-1/2 mx-auto">
            {props.hashTags.map((hashTag) => (
                <HashTag {...hashTag} key={hashTag.id} />
            ))}
        </div>
    );
};

export default TrendingList;
