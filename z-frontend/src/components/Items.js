import React, {useEffect, useContext} from 'react';
import { InventoryContext } from '../App';
import styled from 'styled-components';
import Dropdown from "react-bootstrap/Dropdown";

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 0.5em;
  margin: 1em;
  margin-right: 10em;
`;

export const Items = () => {
  const {allItems, setAllItems, userList, setUserList} = useContext(InventoryContext);

  const itemurl = `http://localhost:8080/useritem`;
  const itemheroku = `https://z-prefix-backend-castro.herokuapp.com/useritem`;

  useEffect(() => {
    fetch(itemurl)
      .then(res => res.json())
      .then(data => setAllItems(data))
  }, []);

  const userurl = `http://localhost:8080/users`;
  const userheroku = `https://z-prefix-backend-castro.herokuapp.com/users`;

  useEffect(() => {
    fetch(userurl)
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
        //console.log(data.id)
      });
  }, []);

  return (
    <div>
      <h2>List of All Items</h2>
      <h4>Number of items: {allItems.length}</h4>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choose user id
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {userList.map((user) => (
            <Dropdown.Item >{user.id}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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