import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import LoadingFeed from "../../components/LoadingFeed";
import Image from "next/image";
import { UserContext } from "../../components/UserContext";
import { signOut } from "next-auth/client";
import Post from "../../components/Post";

const GET_USER = gql`
    query GetUser($name: String) {
        getUser(name: $name) {
            name
            email
            image
            postsCreated {
                id
                content
                createdOn
                author {
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
        getUserCreatedPosts(name: $name) {
            id
            content
            createdOn
            author {
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
        getUserLikedPosts(name: $name) {
            id
            content
            createdOn
            author {
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

const User: FC = () => {
    const router = useRouter();
    const { name } = router.query;
    const { data, loading, refetch } = useQuery(GET_USER, {
        pollInterval: 1000,
        variables: { name },
    });
    const { user, setUser } = useContext(UserContext);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [showCreated, setShowCreated] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            if (user.name === name) {
                setIsUser(true);
            } else {
                setIsUser(false);
            }
        } else {
            setIsUser(false);
        }
    }, [user]);

    if (loading) {
        return (
            <LoadingFeed>
                <h1 className="text-xl text-purple-700 text-center">
                    Profile Loading
                </h1>
            </LoadingFeed>
        );
    }

    if (!data) {
        return (
            <h1 className="text-xl text-purple-700 text-center">
                No profile with {name}
            </h1>
        );
    }

    const handleSignOut = () => {
        signOut();
        router.push("/");
    };

    return (
        <div className="md:m-4 md:flex">
            <div className="flex p-4 m-4 rounded-md shadow-md bg-white items-center md:w-1/5 md:flex-col md:h-1/5">
                <Image
                    src={data.getUser.image}
                    width="128"
                    height="128"
                    alt="User Profile Picture"
                    className="rounded-full"
                />
                <div className="font-serif ml-4 md:mt-2">
                    <h4 className="text-xl md:text-2xl">{data.getUser.name}</h4>
                    <p className="text-gray-600 md:text-xl">
                        {data.getUser.email ? data.getUser.email : "Null Email"}
                    </p>
                    <p className="font-mono text-gray-700 md:text-lg">
                        {data.getUserCreatedPosts.length} posts created
                    </p>
                    <p className="font-mono text-gray-700 md:text-lg">
                        {data.getUserLikedPosts.length} posts liked
                    </p>
                    {isUser && (
                        <button
                            className="font-mono uppercase border-2 border-red-400 px-4 py-2 rounded-md mt-2"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    )}
                </div>
            </div>
            <div className="md:w-4/5">
                <div className="my-4 flex justify-around md:justify-center text-purple-700 text-2xl font-serif">
                    <h2
                        className={`p-2 cursor-pointer mx-4 ${
                            showCreated && "border-2 rounded border-purple-700"
                        }`}
                        onClick={() => setShowCreated(true)}
                    >
                        Created
                    </h2>
                    <h2
                        className={`p-2 cursor-pointer mx-4 ${
                            !showCreated && "border-2 rounded border-purple-700"
                        }`}
                        onClick={() => setShowCreated(false)}
                    >
                        Liked
                    </h2>
                </div>
                <div className="md:w-2/3 mx-auto">
                    {showCreated
                        ? data.getUserCreatedPosts.map((post, index) => (
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
                                  refetchAction={refetch}
                              />
                          ))
                        : data.getUserLikedPosts.map((post, index) => (
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
                                  refetchAction={refetch}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
};

export default User;
