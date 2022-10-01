import React, {useContext, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { InventoryContext } from "../App";
//not used

const EditItemModal = (props) => {
    // const { editID} = useContext(InventoryContext);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleEditItem = (id) => {
        fetch(`http://localhost:8080/items/${id}`, {
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
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setItemName(e.target.value)}
            autoFocus
          ></input>
          <label htmlFor="description">Item Description</label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => setItemDescription(e.target.value)}
          ></textarea>
          <label htmlFor="quantity">Item Quantity</label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={() => handleEditItem(props.id)}>Edit</Button>
        </Modal.Footer>
      </Modal>
    );
}

export const EditItem = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <EditItemModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};