import React, { useEffect, useContext } from "react";
import { InventoryContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AddItem } from "./AddItem";
import { EditItem } from "./EditItem";

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 0.5em;
  margin: 1em;
  margin-right: 10em;
`;

export const AdminItems = () => {
  const { adminItems, setAdminItems, userID } = useContext(InventoryContext);

  const navigate = useNavigate();

  const url = `http://localhost:8080/useritem/${userID}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdminItems(data));
  }, [url]);

  //http://localhost:8080/items/8
  const handleDeleteItem = (id) => {
    fetch(`http://localhost:8080/items/${id}`, {
      method: "DELETE",
    })
      .then(window.location.reload(false))
      // .then(alert("Item deleted successfully"))
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <h2>List of Items for User ID: {userID}</h2>
      {/* <button style={{ marginLeft: "0.5em" }}>Add</button> */}
      <AddItem/>
      <button
        style={{ marginLeft: "0.5em" }}
        onClick={() => navigate("/items")}
      >
        All Items
      </button>
      <h4>Number of items: {adminItems.length}</h4>
      <ul>
        {adminItems.map((item) => (
          <StyledDiv>
            <p key={item.id}>
              Name: {item.item_name}
              {/* <button style={{ marginLeft: "0.5em" }}>Update</button> */}
              <EditItem />
              <button
                style={{ marginLeft: "0.5em" }}
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
              <ul>
                {/* <li>Description: {item.item_description}</li> */}
                {item.item_description.length > 100 ? (
                  <li>
                    Description: {item.item_description.substring(0, 100)}...
                  </li>
                ) : (
                  <li>Description: {item.item_description}</li>
                )}
                <li>Quantity: {item.quantity}</li>
              </ul>
            </p>
          </StyledDiv>
        ))}
      </ul>
    </div>
  );
};
