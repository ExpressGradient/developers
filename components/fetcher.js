import { request } from "graphql-request";

const fetcher = (query) => request("/api/graphql", query);

export default fetcher;