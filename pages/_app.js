import '../styles/globals.css';
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import { Provider } from "next-auth/client";
import UserContextProvider from "../components/UserContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";

function MyApp({ Component, pageProps }) {
    return <>
        <Provider session={pageProps.session}>
            <UserContextProvider>
                <ApolloProvider client={client}>
                    <CustomHead />
                    <Header />
                    <Component {...pageProps} />
                </ApolloProvider>
            </UserContextProvider>
        </Provider>
    </>
}

export default MyApp
