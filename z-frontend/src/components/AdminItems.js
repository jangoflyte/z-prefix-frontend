import React, { useEffect, useContext, useState } from "react";
import { InventoryContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AddItem } from "./AddItem";
// import { EditItem } from "./EditItem";
import Button from "react-bootstrap/Button";

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
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1em;
  margin-left: 40%;
  margin-right: 40%;
  border-radius: 3px;
  border: 1px solid black;
`;

export const AdminItems = () => {
  const { adminItems, setAdminItems, userID} = useContext(InventoryContext);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const url = `http://localhost:8080/useritem`;
  const heroku = `https://z-prefix-backend-castro.herokuapp.com/useritem`;

  useEffect(() => {
    //`${heroku}/${userID}` || `${url}/${userID}`
    fetch(`${url}/${userID}`)
      .then((res) => res.json())
      .then((data) => setAdminItems(data));
  }, [userID]);

  const itemurl = `http://localhost:8080/items`;
  const itemheroku = `https://z-prefix-backend-castro.herokuapp.com/items`;
  
  //http://localhost:8080/items/8
  const handleDeleteItem = (id) => {
    //`${itemheroku}/${id}` || `${itemurl}/${id}`
    fetch(`${itemurl}/${id}`, {
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

  const handleEditName = (id) => {
    //`${itemheroku}/${id}` || `${itemurl}/${id}`
    fetch(`${itemurl}/${id}`, {
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
    fetch(`${itemurl}/${id}`, {
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
    fetch(`${itemurl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: quantity,
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
      <Button
        variant="secondary"
        style={{ marginLeft: "0.5em" }}
        onClick={() => navigate("/items")}
      >
        All Items
      </Button>
      <h4>Number of items: {adminItems.length}</h4>
      <ul>
        {adminItems.map((item) => (
          <StyledDiv>
            <>
              {toggle === true ? (
                <StyledForm>
                  <p style={{ textAlign: "center" }}>
                    Warning: Only 1 field can be updated...
                  </p>

                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="item name"
                  ></input>
                  <Button onClick={() => handleEditName(item.id)}>
                    Submit
                  </Button>

                  <textarea
                    type="text"
                    name="description"
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="item description"
                  ></textarea>
                  <Button onClick={() => handleEditDescription(item.id)}>
                    Submit
                  </Button>

                  <input
                    type="text"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="item quantity"
                  ></input>
                  <Button onClick={() => handleEditQuantity(item.id)}>
                    Submit
                  </Button>
                </StyledForm>
              ) : null}
            </>
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
            <Button
              style={{ marginLeft: "0.5em" }}
              onClick={() => handleShowEditButton()}
            >
              Edit
            </Button>
            {/* {setEditID(item.id)} */}
            {/* <EditItem id={item.id}/> */}
            <Button
              variant="danger"
              style={{ marginLeft: "0.5em" }}
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </Button>
          </StyledDiv>
        ))}
      </ul>
    </>
  );
};
