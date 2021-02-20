import { FC } from "react";
import Feed from "../components/Feed";
import { GetServerSideProps } from "next";
import { gql, GraphQLClient, request } from "graphql-request";
import useSWR from "swr";

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

    return (
        <main>
            <Feed data={data} />
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
