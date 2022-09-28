import React, { useEffect, useContext } from "react";
import { InventoryContext } from "../App";

export const AdminItems = () => {
  const { adminItems, setAdminItems, id } = useContext(InventoryContext);

  const url = `http://localhost:8080/useritem/${id}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdminItems(data));
  }, [url]);

  return (
    <div>
      <h1>List of Items</h1>
      <ul>
        {adminItems.map((item) => (
          <li key={item.id}>
            Name: {item.item_name}
            <button>Update</button>
            <button>Delete</button>
            <ul>
              {/* <li>Description: {item.item_description}</li> */}
              {item.item_description.length > 100 ? (
                <li>...</li>
              ) : (
                <li>Description: {item.item_description}</li>
              )}
              <li>Quantity: {item.quantity}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
