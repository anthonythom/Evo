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
  background-color: #F29F05;
  

  @media (max-width: 768px) {
    width: 20%;
  }
`;


const Logo = styled.img`
  width: 120px;
`;
const Links = styled.ul`
  display: flex;
align-items: center;
  gap: 50px;
  cursor: pointer;
  font-size: 1.1rem;
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
    background-color: #BF0404;
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

    background-color: #BF0404;
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
  padding: 12px 25px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: none;
  border-radius: 8px;
  color: #fff;
  background:  #730202;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    transition: 1.3s;
    border: solid 1px #730202;
    background: transparent;
    color: #730202;
  }
`;

const ButtonC = styled.button`
padding: 12px 25px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background: #D28B07;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    transition: 1.3s;
    color: #000000;
    background-color: #fff;
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
      
        <Logo src="logo.png" />
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
            
          ) }
        </div>
      </Links>
    </Container>
  );
};
