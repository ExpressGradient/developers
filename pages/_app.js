import '../styles/globals.css';
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return <>
        <Provider session={pageProps.session}>
            <CustomHead />
            <Header />
            <Component {...pageProps} />
        </Provider>
    </>
}

export default MyApp
