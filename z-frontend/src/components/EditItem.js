import React, {useState} from 'react';

const EditItemModal = () => {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleEditItem = () => {
        fetch(`http://localhost:8080/items`, {
          method: "PATCH",
          body: JSON.stringify({
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
          <button onClick={() => handleEditItem()}>Edit</button>
        </form>
      </>
    );
}

export const EditItem = () => {
    const [modalShow, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit</button>
        <EditItemModal show={modalShow} onHide={() => setShowModal(false)}/>
      </>
    );
};