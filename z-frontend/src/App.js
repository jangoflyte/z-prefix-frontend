import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Login } from './components/Login';
import { Banner } from './components/Banner';
import { Items } from './components/Items';
import { AdminItems } from './components/AdminItems';
import './App.css';

export const InventoryContext = React.createContext();

function App() {
  const [allItems, setAllItems] = useState([]);
  const [adminItems, setAdminItems] = useState([]);
  const [id, setId] = useState(1);

  const invObj = {
    allItems,
    setAllItems,
    adminItems,
    setAdminItems,
    id,
    setId,
  };

  return (
    <InventoryContext.Provider value={invObj}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Banner />
      </Link>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/admin" element={<AdminItems />}></Route>
      </Routes>
    </InventoryContext.Provider>
  );
}

export default App;
