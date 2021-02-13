import '../styles/globals.css';
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return <>
        <CustomHead />
        <Header />
        <Component {...pageProps} />
    </>
}

export default MyApp
