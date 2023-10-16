import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthGoogle from "./auth/authGoogle";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #000000;
  background-image: url("public/bg.png");
  background-repeat: repeat;
  background-size: 100%;
`;

const Container = styled.div`
  margin-top: 250px;
  display: flex;
  height: 500px;
  background-color: rgba(82, 82, 82, 0.697);

  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 8px 30px 0 rgba(17, 17, 17, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(13.5px);
  &:hover {
    background-color: rgba(92, 90, 90, 0.697);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  }
 

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
  color: #000000;
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
  padding: 20px;
  background-color: #fdfcff52;
  border: none;
  border-radius: 5px;
  color: #000000;
  width: 50%;
`;

const Label = styled.label`
  padding: 20px;
  border: none;
  border-radius: 5px;
  color: #000000;
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
        alert("Dados incorretos, tente novamente.");
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
      alert("Cadastro concluído! Agora faça login.");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
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
