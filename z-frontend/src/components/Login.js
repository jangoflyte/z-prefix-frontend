import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { InventoryContext } from "../App";
import Button from "react-bootstrap/Button";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
  border: 1px solid black;
`;

export const Login = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const { firstName, setFirstName, username, setUsername } =
      useContext(InventoryContext);
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
      setToggle(!toggle);
    }

    const createurl = `http://localhost:8080/create`;
    const createheroku = `https://z-prefix-backend-castro.herokuapp.com/create`;

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

    const loginurl = `http://localhost:8080/userlogin`;
    const loginheroku = `https://z-prefix-backend-castro.herokuapp.com/userlogin`;

    const handleLoginUser = () => {
      fetch(loginurl, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          passwordHash: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then(navigate("/welcome"))
        .catch((err) => console.log(err));
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
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="type in username..."
                  autoFocus
                  required
                />
                <label htmlFor="loginpassword">Password</label>
                <input
                  type="password"
                  name="loginpassword"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="type in password..."
                  required
                />
                <Button type="submit" onClick={() => handleLoginUser()}>
                  Submit
                </Button>
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
                <Button type="submit" onClick={() => handleCreateUser()}>
                  Submit
                </Button>
              </>
            </>
          )}

          <label htmlFor="signin">Already a user?</label>
          <Button variant="success" type="submit" name="signin" onClick={() => handleLogin()}>
            Sign In
          </Button>
          <label htmlFor="visitor">Click if no account</label>
          <Button type="submit" name="visitor" onClick={() => navigate("/items")}>
            Visitor
          </Button>
        </form>
      </StyledDiv>
    );
}