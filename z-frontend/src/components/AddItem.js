import React, {useContext, useState} from 'react';
import { InventoryContext } from '../App';

const AddItemModal = () => {
    const {userID} = useContext(InventoryContext);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleAddItem = () => {
        fetch(`http://localhost:8080/items`, {
          method: "POST",
          body: JSON.stringify({
            user_id: userID,
            item_name: itemName,
            item_description: itemDescription,
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
        ;
    };

    return (
      <>
        <form>
          <h4>Add Item</h4>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setItemName(e.target.value)}
            autoFocus
          ></input>
          <label htmlFor="description">Item Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => setItemDescription(e.target.value)}
          ></input>
          <label htmlFor="quantity">Item Quantity</label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <button onClick={() => handleAddItem()}>Add</button>
        </form>
      </>
    );
}

export const AddItem = () => {
    const [modalShow, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Add</button>
        <AddItemModal show={modalShow} onHide={() => setShowModal(false)}/>
      </>
    );
};