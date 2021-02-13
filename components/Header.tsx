import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface NavLinkProps {
    slug: string;
    link: string;
    isActive: boolean;
}

const NavLink: FC<NavLinkProps> = (props) => (
    <Link href={props.slug}>
        <motion.a
            className={`text-sm md:text-base text-purple-800 px-4 py-2 font-serif md:mr-4 md:cursor-pointer ${
                props.isActive
                    ? "border-2 border-purple-800 rounded"
                    : "border-2 border-transparent"
            }`}
            whileTap={{ scale: 0.9 }}
        >
            {props.link}
        </motion.a>
    </Link>
);

const Header: FC = () => {
    const router = useRouter();
    const navLinks = [
        {
            link: "Home",
            slug: "/",
        },
        {
            link: "About",
            slug: "/about",
        },
    ];

    const handleClick = () => router.push("/");

    return (
        <header className="p-4 border-b-2 border-purple-800 md:flex justify-between">
            <h1
                className="text-4xl md:text-5xl md:cursor-pointer text-center text-purple-900 font-mono md:ml-4"
                onClick={handleClick}
            >
                <span className="text-green-600">{"{"}</span>developers
                <span className="text-green-600">{"}"}</span>
            </h1>
            <nav className="mt-4 md:mt-0 flex justify-evenly items-center">
                {navLinks.map((navLink, index) => (
                    <NavLink
                        {...navLink}
                        isActive={router.pathname === navLink.slug}
                        key={index}
                    />
                ))}
                <motion.button
                    className="px-4 py-2 bg-black text-white text-sm md:text-base flex font-serif rounded shadow-md hover:text-gray-300 items-center"
                    whileTap={{ scale: 0.9 }}
                >
                    <Image src="/GitHub-icon.png" width="25%" height="25%" />
                    <span className="ml-2">Sign in</span>
                </motion.button>
            </nav>
        </header>
    );
};

export default Header;
