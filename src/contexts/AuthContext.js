import React,{ useEffect,useState,useContext } from "react";



export const UserContext = React.createContext({ name: '', auth: false });

export const UserProvider = ({ children }) => {

    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ name: '', auth: true });
    const [userData, setUserData] = useState(false);

    // Login updates the user data with a name parameter
    const login = async (loginData) => {
    console.log(loginData);
    await setUser(loginData);
    console.log("authenticated");
    // console.log(user);
  };

  const readUser = async (readData) =>{

    await setUserData(readData);
  };

  // Logout updates the user data to default
  const logout = () => {
    
    setUserData((user) => (false));
    setUser(false);
    console.log(userData)
    return(true);

  };

    return (
      <UserContext.Provider value={{ user, userData, login, logout, readUser }}>
        {children}
      </UserContext.Provider>
    );
  }