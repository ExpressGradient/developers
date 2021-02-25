import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../graphql/typedefs";
import resolvers from "../../graphql/resolvers";

export const config = { api: { bodyParser: false } };

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
export default server.createHandler({ path: "/api/graphql" });
