import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface TabLinkProps {
    route: string;
    name: string;
}

const TabLink: FC<TabLinkProps> = (props) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (router.pathname === props.route) {
            setIsActive(true);
        }
    });

    return (
        <Link href={props.route}>
            <a
                className={`text-purple-800 text-xl font-serif hover:text-purple-500 py-2 px-3 md:mx-4 ${
                    isActive && "border-2 border-purple-800 rounded-md"
                }`}
            >
                {props.name}
            </a>
        </Link>
    );
};

const Tabs: FC = (props) => {
    const tabs: TabLinkProps[] = [
        {
            route: "/",
            name: "Feed",
        },
        {
            route: "/trending",
            name: "Trending",
        },
    ];

    return (
        <div className="flex justify-evenly md:justify-center mb-4">
            {tabs.map((tab, index) => (
                <TabLink {...tab} key={index} />
            ))}
        </div>
    );
};

export default Tabs;
