import React, {useEffect, useContext} from 'react';
import { InventoryContext } from '../App';

export const Items = () => {
    const {allItems, setAllItems} = useContext(InventoryContext);

    useEffect(() => {
        fetch(`http://localhost:8080/useritem`)
            .then(res => res.json())
            .then(data => setAllItems(data))
    }, [allItems]);

    return (
      <div>
        <h1>List of Items</h1>
        <ul>
          {allItems.map((item) => (
            <li key={item.id}>
              Name: {item.item_name}
              <ul>
                <li>Description: {item.item_description}</li>
                {item.item_description }
                <li>Quantity: {item.quantity}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
}