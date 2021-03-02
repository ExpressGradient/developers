import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import LoadingFeed from "../components/LoadingFeed";
import Tabs from "../components/Tabs";
import TrendingList from "../components/TrendingList";

const GET_HASHTAGS = gql`
    query GetHashTags {
        getHashTags {
            id
            name
            postsUnderHashTag {
                id
            }
        }
    }
`;

const Trending: FC = () => {
    const { data, loading } = useQuery(GET_HASHTAGS, { pollInterval: 1000 });

    if (loading) {
        return (
            <LoadingFeed>
                <Tabs />
            </LoadingFeed>
        );
    }

    return (
        <div className="mt-4">
            <Tabs />
            {data && <TrendingList hashTags={data.getHashTags} />}
        </div>
    );
};

export default Trending;
