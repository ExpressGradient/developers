import { FC } from "react";
import Feed from "../components/Feed";
import { GetServerSideProps } from "next";
import { gql, GraphQLClient } from "graphql-request";

const Home: FC<any> = (props) => (
    <main>
        <Feed data={props.data} />
    </main>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const graphQLClient = new GraphQLClient(process.env.API_URL);
    const data = await graphQLClient.request(gql`
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
    `);

    if (data) {
        return {
            props: { data },
        };
    }

    return { props: {} };
};

export default Home;
