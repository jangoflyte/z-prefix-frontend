import React, {useContext} from 'react';
import { InventoryContext } from '../App';
import {Link} from 'react-router-dom';

export const Banner = () => {
    const {firstName} = useContext(InventoryContext);
    return (
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ textAlign: "center" }}>Inventory App</h1>
        </Link>

        {/* <h3 style={{ textAlign: "right", marginRight: "0.5em" }}>Welcome, {firstName}</h3> */}
      </div>
    );
}