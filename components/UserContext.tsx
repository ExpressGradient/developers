import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface UserContextType {
    user: any;
    setUser: Dispatch<SetStateAction<{}>>;
}

export const UserContext = createContext({
    user: {},
    setUser: () => {},
} as UserContextType);

const UserContextProvider: FC = (props) => {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
