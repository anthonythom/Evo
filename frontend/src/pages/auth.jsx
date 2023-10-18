import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthGoogle from "./auth/authGoogle";
import swal from 'sweetalert';

const Section = styled.div`
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");
font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-image: url("bg-user.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  margin-top: 250px;
  display: flex;
  height: 500px;
color: white;
  background: rgba(221, 218, 218, 0.37);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
  border: 1px solid rgba(221, 218, 218, 0.7);

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
  font-weight: bold;
  justify-content: center;
  color: #fff;
`;

const FormG = styled.form`
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
padding: 15px;
  background-color: #252525;
  border: none;
  border: 1px solid #F29F05;
  box-shadow: 0px 0px 10px #F29F05;
  border-radius: 9px;
  color: #ffffff;
  width: 60%;
`;

const Label = styled.label`
  padding: 20px 0px;
  border: none;
  border-radius: 5px;
  color: white;

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
border-color: #fff;
  border-radius: 10px;

  color: #fff;
  background: transparent;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #F29F05;
    transition: 1.2s;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        email,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        swal("Dados incorretos, tente novamente.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Entrar</Title>
        <FormG>
          <Label htmlFor="username">Usuario:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormG>
        <FormG>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormG>

        <FormG>
          <Label htmlFor="password">Senha:</Label>

          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormG>
        <Button type="submit">Entrar</Button>
        <AuthGoogle />
      </Form>
    </Container>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        email,
        password,
      });
      swal("Cadastro concluído! Agora faça login. " , "success");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        swal(
          "Usuário já cadastrado. Por favor, escolha outro nome de usuário."
        );
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Cadastrar-se</Title>
        <FormG>
          <Label htmlFor="username">Usuario:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormG>
        <FormG>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormG>
        <FormG>
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormG>
        <Button type="submit">Cadastrar</Button>
        <AuthGoogle />
      </Form>
    </Container>
  );
};
