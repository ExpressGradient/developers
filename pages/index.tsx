import { FC, useEffect } from "react";
import useSWR from "swr";
import { request } from "graphql-request";
import { useSession } from "next-auth/client";

const fetcher = (query) => request("/api/graphql", query);

const Home: FC = (props) => {
    const { data } = useSWR(
        `
        query {
            users {
                id
                name
                email
                postsCreated {
                    content
                }
                postsLiked {
                    content
                }
            }
        }
    `,
        fetcher
    );
    const session = useSession()[0];

    useEffect(() => {
        if (data) {
            console.log(data);
        }
        if (session) {
            console.log(session.user);
        }
    });

    return <></>;
};

export default Home;
