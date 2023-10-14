import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 10px;
 
  background-image: conic-gradient(
    from 90deg at 50% 100%,
    #ffffff 0deg,
    #ff9d00 90deg,
    #ff6f00 1.9turn
  );
  box-shadow: 0 4px 4px 2px rgba(113, 113, 115, 0.5);

  @media (max-width: 768px) {
    width: 20%;
  }
`;


const Logo = styled.img`
  width: 150px;
`;
const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 50px;
  cursor: pointer;

  
  font-size: 25px;
  font-family: "Poppins", sans-serif;
 
`;
const ListItem1 = styled.li`
color: #ffffff;
position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;

    background-color: #0044ff;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s;
  }

  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
`;
const ListItem2 = styled.li`
color: #ffffff;
position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;

    background-color: #ffdd00;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s;
  }

  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
`;
const ListItem3 = styled.li`
color: #ffffff;
position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;

    background-color: #ff0000;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s;
  }

  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
`;


const Button = styled.button`
  height: 50px;
  width: 100px;
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

const ButtonC = styled.button`
  margin-left: 10px;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: 1px;
  border-style: solid;

  border-radius: 50px;

  color: #ffffff;
  background: transparent;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
    background-color: #ffcc00;
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
      <Link to="/">
      
        <Logo src="public/logo.png" />
      </Link>

      <Links>

        <Link style={{ "text-decoration": "none" }} to="/">
          <ListItem1>Início</ListItem1>
        </Link>

        <Link style={{ "text-decoration": "none" }} to="/create-recipe">
          <ListItem2>Criar Receita</ListItem2>
        </Link>

        <Link style={{ "text-decoration": "none" }} to="/saved-recipes">
          <ListItem3>Receitas Salvas</ListItem3>
        </Link>

        <div>
          {" "}
          {!cookies.access_token ? (
            <Link to="/auth">
              {" "}
              <Button>Entrar</Button>
              <ButtonC>Cadastre-se</ButtonC>
            </Link>
          ) : (
            <Button onClick={logout}> Sair </Button>
          )}
        </div>
      </Links>
    </Container>
  );
};
