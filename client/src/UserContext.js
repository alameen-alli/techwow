const { createContext, useState } = require("react");

export const UserContext = createContext({});

export function UserContextProvider ({children}) {
    const [currentUserInfo, setCurrentUserInfo] = useState({});
    return (
        <UserContext.Provider value={{currentUserInfo, setCurrentUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}