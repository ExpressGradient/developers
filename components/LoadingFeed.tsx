import { FC } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";

interface LoadingLineProps {
    width: string;
}

const LoadingLine: FC<LoadingLineProps> = (props) => (
    <motion.div
        className={`h-1 bg-gray-400 my-3 ${props.width}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
    ></motion.div>
);

const LoadingFeed: FC = (props) => (
    <>
        <div className="mt-4">{props.children}</div>
        <div className="md:w-1/2 mx-auto">
            {[1, 2, 3].map((_, index) => (
                <div
                    className="bg-white mb-6 mx-4 md:mx-0 p-4 rounded shadow"
                    key={index}
                >
                    <LoadingLine width={"w-1/2"} />
                    <LoadingLine width={"w-full"} />
                    <LoadingLine width={"w-full"} />
                    <LoadingLine width={"w-full"} />
                    <LoadingLine width={"w-1/3"} />
                </div>
            ))}
        </div>
    </>
);

export default LoadingFeed;
