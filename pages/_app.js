import '../styles/globals.css';
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return <div className="bg-blue-100 h-full min-h-screen">
        <CustomHead />
        <Header />
        <Component {...pageProps} />
    </div>
}

export default MyApp
