import React, {useContext, useState} from 'react';
import { InventoryContext } from '../App';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddItemModal = (props) => {
    const {currentUser} = useContext(InventoryContext);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const url = `http://localhost:8080/items`;
    const heroku = `https://z-prefix-backend-castro.herokuapp.com/items`;

    const handleAddItem = () => {
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            user_id: currentUser,
            item_name: itemName,
            item_description: itemDescription,
            quantity: quantity,
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then(window.location.reload(false))
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
        <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
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
        <Button variant="success" onClick={() => handleAddItem()}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function AddItem() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add
      </Button>

      <AddItemModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

