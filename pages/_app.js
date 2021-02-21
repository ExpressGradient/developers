import '../styles/globals.css';
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import { Provider } from "next-auth/client";
import UserContextProvider from "../components/UserContext";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
    return <>
        <Provider session={pageProps.session}>
            <UserContextProvider>
                <SWRConfig value={{ refreshInterval: 100 }}>
                    <CustomHead />
                    <Header />
                    <Component {...pageProps} />
                </SWRConfig>
            </UserContextProvider>
        </Provider>
    </>
}

export default MyApp
