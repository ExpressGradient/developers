import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";
import { FC, useEffect, useState } from "react";
import Feed from "../components/Feed";
import LoadingFeed from "../components/LoadingFeed";
import Image from "next/image";
import CreatePostModal from "../components/CreatePostModal";
import { motion } from "framer-motion";

const GET_POSTS = gql`
    query GetPosts {
        getPosts {
            id
            content
            createdOn
            author {
                id
                name
                image
            }
            hashTags {
                name
            }
            likedBy {
                id
            }
        }
    }
`;

const Home: FC = () => {
    const { data, loading, error, refetch } = useQuery(GET_POSTS, {
        pollInterval: 1000,
    });
    const [session] = useSession();
    const [showModal, setShowModal] = useState<boolean>();
    const [rotateAngle, setRotateAngle] = useState<number>(0);

    useEffect(() => {
        setRotateAngle(showModal ? 135 : 0);
    }, [showModal]);

    if (loading) {
        return <LoadingFeed />;
    }

    if (error) {
        console.error(error);
        return <h1>Error</h1>;
    }

    if (!data) {
        console.log("404 data not found");
        return <h1>404 Data not found</h1>;
    }

    return (
        <>
            <div className={showModal ? "opacity-50" : "opacity-100"}>
                <Feed posts={data.getPosts} refetchAction={refetch} />
            </div>
            {session && (
                <>
                    {showModal && (
                        <CreatePostModal
                            setShowModal={setShowModal}
                            refetchAction={refetch}
                        />
                    )}
                    <motion.div
                        className="fixed bottom-6 right-8 rounded-full shadow-md cursor-pointer hover:shadow-xl active:shadow-none flex z-10"
                        animate={{ rotate: rotateAngle }}
                    >
                        <Image
                            src="/create-button.png"
                            alt="Plus Image for Creating Posts"
                            width={64}
                            height={64}
                            quality={100}
                            onClick={() => setShowModal(!showModal)}
                            className="transform scale-75 md:scale-100"
                        />
                    </motion.div>
                </>
            )}
        </>
    );
};

export default Home;
