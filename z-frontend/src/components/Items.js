import React, {useEffect, useContext} from 'react';
import { InventoryContext } from '../App';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 0.5em;
  margin: 1em;
  margin-right: 10em;
`;

export const Items = () => {
  const {allItems, setAllItems} = useContext(InventoryContext);

  const url = `http://localhost:8080/useritem`;
  const heroku = `https://z-prefix-backend-castro.herokuapp.com/useritem`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllItems(data))
  }, []);

  return (
    <div>
      <h2>List of All Items:</h2>
      <h4>Number of items: {allItems.length}</h4>
      <ul>
        {allItems.map((item) => (
          <StyledDiv>
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
          </StyledDiv>
        ))}
      </ul>
    </div>
  );
}