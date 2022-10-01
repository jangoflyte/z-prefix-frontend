import React, {useEffect, useContext, useState} from 'react';
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
  const {
    allItems,
    setAllItems,
    userList,
    setUserList,
    userID,
    setUserID,
    specificItems,
    setSpecificItems,
  } = useContext(InventoryContext);
  const [toggle, setToggle] = useState(false);

  const itemurl = `http://localhost:8080/useritem`;
  const itemheroku = `https://z-prefix-backend-castro.herokuapp.com/useritem`;

  useEffect(() => {
    fetch(itemurl)
      .then(res => res.json())
      .then(data => setAllItems(data))
  }, []);

  const handleClick = (id) => {
    setToggle(!toggle);
    setUserID(id);
  };

  console.log(userID);

  const specificurl = `http://localhost:8080/useritem/${userID}`;
  const specificheroku = `https://z-prefix-backend-castro.herokuapp.com/useritem${userID}`;

  useEffect(() => {
    fetch(specificurl)
      .then((res) => res.json())
      .then((data) => setSpecificItems(data));
  }, []);

  console.log(specificItems);

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
            <Dropdown.Item onClick={() => handleClick(user.id)}>{user.id}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <>
        {allItems.map((item) => (
          <StyledDiv>
            <ul key={item.id}>
              Name: {item.item_name}
              <ul>
                {item.item_description.length > 100 ? (
                  <li>
                    Description: {item.item_description.substring(0, 100)}...
                  </li>
                ) : (
                  <li>Description: {item.item_description}</li>
                )}
                <li>Quantity: {item.quantity}</li>
              </ul>
            </ul>
          </StyledDiv>
        ))}
      </>
    </div>
  );
}