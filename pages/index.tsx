import { FC, useContext, useState } from "react";
import Feed from "../components/Feed";
import { GetServerSideProps } from "next";
import { gql, GraphQLClient } from "graphql-request";
import useSWR from "swr";
import Image from "next/image";
import CreatePostModal from "../components/CreatePostModal";
import { UserContext } from "../components/UserContext";

const getPosts = gql`
    query GetPosts {
        posts {
            id
            content
            createdOn
            author {
                id
                name
                image
            }
            likedBy {
                id
            }
            hashTags {
                id
                name
            }
        }
    }
`;

const Home: FC<any> = (props) => {
    const { data, error } = useSWR(getPosts, {
        initialData: props.data,
    });
    const { user, setUser } = useContext(UserContext);

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <main>
            <div className={`z-0 ${showModal ? "opacity-50" : "opacity-100"}`}>
                <Feed data={data} />
            </div>
            {Object.keys(user).length !== 0 ? (
                <>
                    {showModal && (
                        <CreatePostModal setShowModal={setShowModal} />
                    )}
                    <div className="fixed bottom-6 right-8 rounded-full shadow-md cursor-pointer hover:shadow-xl active:shadow-none z-10">
                        <Image
                            src="/create-button.png"
                            alt="Plus Image for Creating Posts"
                            width={64}
                            height={64}
                            quality={100}
                            onClick={() => setShowModal(!showModal)}
                        />
                    </div>
                </>
            ) : (
                ""
            )}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const graphQLClient = new GraphQLClient(process.env.API_URL);
    const data = await graphQLClient.request(getPosts);

    if (data) {
        return {
            props: { data },
        };
    }

    return { props: {} };
};

export default Home;
