import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// const AccountDataContext = createContext();

const AccountDataContext = createContext();

// export const useAccountData = () => useContext(AccountDataContext);

export const AccountDataProvider = ({ children }) => {
  const [accountData, setAccountData] = useState([]);
   
    useEffect(()=>{
        const fetchData = async()=>{
          try {
            const response = await axios.get("http://192.168.179.25:5002/account-view");
            if (response.status === 200) {
              setAccountData(response.data);
            } 
          } catch (error) {
            console.log(error);            
          }
        }
       fetchData();
    },[]);
 

  return (
    <AccountDataContext.Provider value={{ accountData ,setAccountData}}>
      {children}
    </AccountDataContext.Provider>
  );
};

export const useAccountData = () =>  { return useContext(AccountDataContext);}