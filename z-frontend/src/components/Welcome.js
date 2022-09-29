import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../App";

export const Welcome = () => {
    const {firstName} = useContext(InventoryContext);
    const navigate = useNavigate();

    return (
        <div>
            <h2>Welcome, {firstName} </h2>
            <button onClick={() => navigate("/admin")}>Personal Items</button>
        </div>
    )
}