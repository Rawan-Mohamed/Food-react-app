import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null); //useState 34an 3ndi data 3yza atklm m3ha so use "useState"
  const [userRole, setUserRole] = useState(null)
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  }
  let baseUrl = "https://upskilling-egypt.com/api/v1";
  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    setUserRole(decodedToken.userGroup)

    // if (encodedToken) {
    //   let decodedToken = jwtDecode(encodedToken);
    //   setUserData(decodedToken);
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
   // Update user data in the context
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
};

  return <AuthContext.Provider value={{ userData, saveUserData, requestHeaders,baseUrl,userRole,updateUserData }}>
    {props.children}
  </AuthContext.Provider>
}