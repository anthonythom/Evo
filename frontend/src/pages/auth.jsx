import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";









const Section = styled.div`
  display: flex;
  justify-content: center;
align-items:center;
width: 100vw;
height: 80vh;

`;


const Container = styled.div`

  margin-top: 250px;
  display: flex;
 height: 500px;
  background-color: #596ed2;
  box-shadow: 0 8px 32px 0 rgba(17, 17, 17, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 10px 10px 0px 0px;


  justify-content: center;
  align-items: center;
  width: 40%;

  border-radius: 5px;
  margin: 5rem auto 0 auto;


  @media (max-width: 768px) {
    width: 100%;
    height: 150%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const Title = styled.h1`
  margin-top: 35px;
  display: flex;
  font-size: 3rem;
  font-weight: 200px;
  justify-content: center;
  color: #ffffff;
`;


const FormG= styled.form`
  
  display: flex;
  
  gap: 10px;
justify-content: space-between;
`;

const Form = styled.form`

  display: flex;
  flex-direction: column;
  gap: 25px;

`;

const Input = styled.input`
  padding: 20px;
  background-color: #fdfcff52;
  border: none;
  border-radius: 5px;
  color: #fcfcfc;
  width: 50%;

  
`;

const Label = styled.label`

  padding: 20px;
  border: none;
  border-radius: 5px;
  color: #fcfcfc ;

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






export const Auth = () => {
  return (
    <Section className="auth">
      <Login />
      <Register />
    </Section>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="auth-container">
      <Form onSubmit={handleSubmit}>
        <Title>Entrar</Title>
        <FormG className="form-group">
          <Label htmlFor="username">Usuario:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormG>
        <FormG className="form-group">
          <Label htmlFor="password">Senha:</Label>
          
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormG>
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Cadastro concluído! Agora faça login.");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Usuário já cadastrado. Por favor, escolha outro nome de usuário.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container className="auth-container">
      <Form onSubmit={handleSubmit}>
        <Title>Cadastrar-se</Title>
        <FormG className="form-group">
          <Label htmlFor="username">Usuario:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormG>
        <FormG className="form-group">
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormG>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};