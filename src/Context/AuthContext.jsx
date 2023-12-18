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
    console.log(decodedToken);

    // if (encodedToken) {
    //   let decodedToken = jwtDecode(encodedToken);
    //   setUserData(decodedToken);
    //   console.log(setUserData)
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);


  return <AuthContext.Provider value={{ userData, saveUserData, requestHeaders,baseUrl,userRole }}>
    {props.children}
  </AuthContext.Provider>
}