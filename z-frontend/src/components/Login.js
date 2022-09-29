import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
    display: flex;
`

export const Login = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    const handleLogin = () => {
      setToggle(!toggle);
    }

    console.log(toggle);
    
    return (
      <form>
        {toggle === true ? (
          <>
            <h3>Login to Account</h3>
            <StyledDiv>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="type in username..."
                autoFocus
                required
              />
              <label htmlFor="username">Password</label>
              <input
                type="password"
                name="password"
                placeholder="type in password..."
                required
              />
              <button type="submit" onClick={() => navigate("/welcome")}>
                Submit
              </button>
            </StyledDiv>
          </>
        ) : (
          <>
            <h3>Create Account</h3>
            <StyledDiv>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="type in first name..."
                autoFocus
                required
              />
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="type in last name..."
                autoFocus
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="type in username..."
                required
              />
              <label htmlFor="username">Password</label>
              <input
                type="password"
                name="password"
                placeholder="type in password..."
                required
              />
              <button type="submit" onClick={() => navigate("/welcome")}>
                Submit
              </button>
            </StyledDiv>
          </>
        )}

        <button type="submit" onClick={() => handleLogin()}>
          Sign In
        </button>
        <button type="submit" onClick={() => navigate("/items")}>
          Visitor
        </button>
      </form>
    );
}