
import { use } from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import React from 'react'
import { fetchLogout, fetchMe } from '../api'

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const[loggedIn,setLoggedIn] = useState(false)
 const [loading, setLoading] = useState(true);
useEffect(() => {
(async () => {

    try {
      const me = await fetchMe();
      setUser(me);
      setLoggedIn(true);
      setLoading(false);
    } catch (error) {
     setLoading(false);
    }
})()
},[]);
const login = (userData) => {
    setLoggedIn(true);
    setUser(userData.user);
   localStorage.setItem('access-token', userData.accessToken);
   localStorage.setItem('refresh-token', userData.refreshToken);

  
  };

const logout =async (callback) => {
setLoggedIn(false);
setUser(null);
await fetchLogout();
 localStorage.removeItem('access-token')
 localStorage.removeItem('refresh-token')
 callback()
};


const values = {
    user,
    login,
    loggedIn,
    logout,
  };
  
if (loading) {
    return <div>Loading...</div>;
  }
  return (
   <AuthContext.Provider value={values}>
    {children}
   </AuthContext.Provider>
  )
}
const useAuth = () => {
    return useContext(AuthContext)
  }
export { AuthProvider, useAuth }
