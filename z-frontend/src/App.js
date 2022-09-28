import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Login } from './components/Login';
import { Banner } from './components/Banner';
import { Items } from './components/Items';
import './App.css';

export const InventoryContext = React.createContext();

function App() {
  const [allItems, setAllItems] = useState([]);
  const [adminItems, setAdminItems] = useState([]);

  const invObj = {
    allItems,
    setAllItems,
    adminItems,
    setAdminItems,
  };

  return (
    <InventoryContext.Provider value={invObj}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Banner />
      </Link>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/items" element={<Items />}></Route>
      </Routes>
    </InventoryContext.Provider>
  );
}

export default App;
