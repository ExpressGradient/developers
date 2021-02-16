import { FC } from "react";
import Image from "next/image";

interface PostProps {
    author: string;
    authorImage: string;
    hashTags: any;
    content: string;
    likeCount: number;
    createdOn: string;
}

const Post: FC<PostProps> = (props) => (
    <div className="bg-white m-4 p-4 rounded shadow font-serif">
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
        <p className="font-mono mt-2 text-lg md:text-2xl">{props.content}</p>
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
    </div>
);

export default Post;
