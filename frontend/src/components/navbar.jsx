import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;
  padding: 10px;
  color: #ffffff;
  background-image: conic-gradient(
    from 90deg at 50% 100%,
    #ffffff 0deg,
    #ff9d00ea 90deg,
    #ff6f00 1.9turn
  );
  box-shadow: 0 4px 4px 2px rgba(113, 113, 115, 0.5);

  @media (max-width: 768px) {
    width: 20%;
  }
`;
const Links = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;

  color: #f9f9f9;

  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0s;

  font-family: "Source Sans Pro", sans-serif;

  @media (max-width: 768px) {
  }
`;

const Button = styled.button`
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: 1px;
  border-style: solid;
  border: purple;
  border-radius: 50px;

  color: #000000;
  background: #f4f884;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background-color: #bd6c29;
    box-shadow: rgb(100 100 111 / 50%) 0 7px 29px 0;
  }
`;

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <Container>
      <Links>
        <Link to="/">Inicio</Link>
        <Link to="/create-recipe">Criar receita</Link>
        <Link to="/saved-recipes">Receitas salvas</Link>

        <div>
          {" "}
          {!cookies.access_token ? (
            <Link to="/auth">
              {" "}
              <Button>Login/Register</Button>
            </Link>
          ) : (
            <Button onClick={logout}> Logout </Button>
          )}
        </div>
      </Links>
    </Container>
  );
};
