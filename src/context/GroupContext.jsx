import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const GroupDataContext = createContext();

export const GroupDataProvider = ({ children }) => {
  const [groupData, setgroupData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get(
          "http://192.168.179.25:5002/group-view"
        );
        if (responce.status === 200) {
          setgroupData(responce.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <GroupDataContext.Provider value={{ groupData, setgroupData }}>
      {children}
    </GroupDataContext.Provider>
  );
};

export const useGroupData = () => {
  return useContext(GroupDataContext);
};
