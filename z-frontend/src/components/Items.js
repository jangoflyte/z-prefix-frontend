import React, {useEffect, useContext} from 'react';
import { InventoryContext } from '../App';

export const Items = () => {
    const {allItems, setAllItems} = useContext(InventoryContext);

    const url = `http://localhost:8080/useritem`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllItems(data))
    }, [url]);

    return (
      <div>
        <h1>List of Items</h1>
        <ul>
          {allItems.map((item) => (
            <li key={item.id}>
              Name: {item.item_name}
              <ul>
                {/* <li>Description: {item.item_description}</li> */}
                {item.item_description.length > 100 ? <li>...</li> : <li>Description: {item.item_description}</li>}
                <li>Quantity: {item.quantity}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
}