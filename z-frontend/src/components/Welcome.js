import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../App";
import Button from "react-bootstrap/Button";
//import { AdminItems } from './AdminItems';

export const Welcome = () => {
    const { firstName, username } =
      useContext(InventoryContext);
    //const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    // const handleClick = () => {
    //     setToggle(!toggle);
    // };
;
    return (
      <div>
        <h2>
          Welcome, {firstName}. Current user: {username}{" "}
        </h2>
        {/* {toggle === false ? (
          <h2>Welcome, {firstName} </h2>
        ) : (
          <h2>Current user: {username} </h2>
        )} */}

        {/* {toggle === false ? (
          <h3>Number of Users: {userList.length}</h3>
        ) : (
          <AdminItems />
        )} */}

        <Button onClick={() => navigate("/admin")}>Personal Items</Button>
        {/* <Button onClick={() => handleClick()}>Personal Items</Button> */}
      </div>
    );
}