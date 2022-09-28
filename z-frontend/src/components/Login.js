import React from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
    display: flex;
`

export const Login = () => {
    const navigate = useNavigate();
    return (
      <form>
        <h3>Login to Account</h3>
        <StyledDiv>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="type in username"
            autoFocus
            required
          />
          <label htmlFor="username">Username</label>
          <input
            type="password"
            name="password"
            placeholder="type in password"
            required
          />
          <button type="submit" onClick={() => navigate("/admin")}>Submit</button>
          <button type="submit" onClick={() => navigate("/items")}>
            Visitor
          </button>
        </StyledDiv>
      </form>
    );
}