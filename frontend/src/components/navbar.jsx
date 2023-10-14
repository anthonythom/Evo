import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap');
  display: flex; 
  justify-content: space-around;
  width: 100%;
align-items: center;
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
const Logo = styled.img`
width: 150px;
`;
const P = styled.div`
font-size: 25px;
margin-top: 4px;

&:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: green;
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: transform 0.3s;
    }

    &:hover {
        &:after {
            transform: scaleX(1);
        }
    };

  
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
  font-family: 'Poppins', sans-serif;
  color: #f9f9f9;

  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0s;



  @media (max-width: 768px) {
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

ButtonC

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
      <Link to="/"> <Logo src="public/logo.png" /></Link>
    
      <Links>
        <Link to="/"><P>Início </P></Link>
        <Link to="/create-recipe"><P>Criar Receita </P></Link>
        <Link to="/saved-recipes"><P>Receitas Salvas </P></Link>

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
