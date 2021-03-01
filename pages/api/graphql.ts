import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../apollo/typedefs";
import resolvers from "../../apollo/resolvers";

export const config = { api: { bodyParser: false } };

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
export default server.createHandler({ path: "/api/graphql" });
