import React, { useEffect, useContext, useState } from "react";
import { InventoryContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AddItem } from "./AddItem";
// import { EditItem } from "./EditItem";

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 0.5em;
  margin: 1em;
  margin-right: 10em;
`;

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
`

export const AdminItems = () => {
  const { adminItems, setAdminItems, userID} = useContext(InventoryContext);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const url = `http://localhost:8080/useritem/${userID}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdminItems(data));
  }, [userID]);

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

  const handleShowEditButton = () => {
    setToggle(!toggle);
    //window.location.reload(false);
  }

  console.log(toggle);

  const handleEditName = (id) => {
    fetch(`http://localhost:8080/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        item_name: itemName,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(window.location.reload(false))
      // .then(alert("Item added successfully"))
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleEditDescription = (id) => {
    fetch(`http://localhost:8080/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        item_description: itemDescription,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(window.location.reload(false))
      // .then(alert("Item added successfully"))
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleEditQuantity = (id) => {
    fetch(`http://localhost:8080/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: quantity
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(window.location.reload(false))
      // .then(alert("Item added successfully"))
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>List of Items for User ID: {userID}</h2>
      {/* <button style={{ marginLeft: "0.5em" }}>Add</button> */}
      <AddItem />
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
            <StyledForm>
              {toggle === true ? (
                <>
                  <button onClick={() => handleEditName(item.id)}>
                    Submit
                  </button>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setItemName(e.target.value)}
                    autoFocus
                    placeholder="item name"
                  ></input>
                  <button onClick={() => handleEditDescription(item.id)}>
                    Submit
                  </button>
                  <textarea
                    type="text"
                    name="description"
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="item description"
                  ></textarea>
                  <button onClick={() => handleEditQuantity(item.id)}>
                    Submit
                  </button>
                  <input
                    type="text"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="item quantity"
                  ></input>
                </>
              ) : null}
            </StyledForm>
            <p key={item.id}>
              Name: {item.item_name}
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
            <button
              style={{ marginLeft: "0.5em" }}
              onClick={() => handleShowEditButton()}
            >
              Edit
            </button>
            {/* {setEditID(item.id)} */}
            {/* <EditItem id={item.id}/> */}
            <button
              style={{ marginLeft: "0.5em" }}
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </button>
          </StyledDiv>
        ))}
      </ul>
    </>
  );
};
