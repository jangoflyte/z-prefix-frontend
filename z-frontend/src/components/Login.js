import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { InventoryContext } from "../App";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
`;

export const Login = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const { firstName, setFirstName, username, setUsername } =
      useContext(InventoryContext);
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginpassword, setLoginPassword] = useState("");

    const handleLogin = () => {
      setToggle(!toggle);
    }

    const createurl = `http://localhost:8080/new`;
    const createheroku = `https://z-prefix-backend-castro.herokuapp.com/new`;

    const handleCreateUser = () => {
      fetch(createurl, {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastname,
          username: username,
          passwordHash: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then(res => res.json())
        .then(navigate("/welcome"))
        .catch(err => console.log(err));
    };
    
    return (
      <StyledDiv>
        <form>
          {toggle === true ? (
            <>
              <h3>Login to Account</h3>
              <>
                <label htmlFor="loginusername">Username</label>
                <input
                  type="text"
                  name="loginusername"
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="type in username..."
                  autoFocus
                  required
                />
                <label htmlFor="loginpassword">Password</label>
                <input
                  type="password"
                  name="loginpassword"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="type in password..."
                  required
                />
                <button type="submit" onClick={() => navigate("/welcome")}>
                  Submit
                </button>
              </>
            </>
          ) : (
            <>
              <h3>Create Account</h3>
              <>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="type in first name..."
                  autoFocus
                  required
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="type in last name..."
                  required
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="type in username..."
                  required
                />
                <label htmlFor="username">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="type in password..."
                  required
                />
                <button type="submit" onClick={() => handleCreateUser()}>
                  Submit
                </button>
              </>
            </>
          )}

          <button type="submit" onClick={() => handleLogin()}>
            Sign In
          </button>
          <button type="submit" onClick={() => navigate("/items")}>
            Visitor
          </button>
        </form>
      </StyledDiv>
    );
}