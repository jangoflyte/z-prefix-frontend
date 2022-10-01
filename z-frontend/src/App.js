import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Login } from './components/Login';
import { Banner } from './components/Banner';
import { Items } from './components/Items';
import { AdminItems } from './components/AdminItems';
import { Welcome } from './components/Welcome';

export const InventoryContext = React.createContext();

function App() {
  const [allItems, setAllItems] = useState([]);
  const [adminItems, setAdminItems] = useState([]);
  const [userID, setUserID] = useState(1);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("...");
  const [userList, setUserList] = useState([]);

  const invObj = {
    allItems,
    setAllItems,
    adminItems,
    setAdminItems,
    userID,
    setUserID,
    username,
    setUsername,
    firstName,
    setFirstName,
    userList,
    setUserList,
  };

  return (
    <InventoryContext.Provider value={invObj}>
      <Banner />

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/admin" element={<AdminItems />}></Route>
      </Routes>
    </InventoryContext.Provider>
  );
}

export default App;
