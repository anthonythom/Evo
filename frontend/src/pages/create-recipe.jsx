import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import swal from 'sweetalert';

const Section = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  background-image: url("bg-create-revenue.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  margin-top: 250px;
  display: flex;
  gap: 50px;
  height: auto;
  border-radius: 16px;
  color: white;
  background: rgba(221, 218, 218, 0.37);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
  border: 1px solid rgba(221, 218, 218, 0.7);
  padding-bottom: 40px;
  justify-content: center;
  width: 60%;

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
  color: white;
`;

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 15px;
  background-color: #252525;
  border: none;
  border: 1px solid #f29f05;
  box-shadow: 0px 0px 10px #f29f05;
  border-radius: 9px;
  color: #ffffff;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: none;
  border: 1px solid #f29f05;
  box-shadow: 0px 0px 10px #f29f05;
  border-radius: 9px;
  color: #ffffff;
  background-color: #252525;
`;

const Button = styled.button`
  margin-left: 10px;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: 1px;
  border-style: solid;

  border-radius: 10px;

  color: white;
  background: transparent;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background-color: #f29f05;
    transition: 1.2s;
    box-shadow: rgb(100 100 111 / 50%) 0 7px 29px 0;
  }
`;

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      swal("Receita criada com sucesso!", "success");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        swal("Você está deslogado. Por favor, se cadastre ou faça login.");
        navigate("/auth");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Section>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Criar Receita</Title>

          <label htmlFor="name">Nome da Receita</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Descrição</label>
          <TextArea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></TextArea>
          <label htmlFor="ingredients">Ingrendientes</label>
          {recipe.ingredients.map((ingredient, index) => (
            <Input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <Button type="button" onClick={handleAddIngredient}>
            Adicionar ingrendientes
          </Button>
          <label htmlFor="instructions">Modo de preparo</label>
          <TextArea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></TextArea>
          <label htmlFor="imageUrl">Url da Imagem</label>
          <Input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Tempo de cozimento (Minutos)</label>
          <Input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <Button type="submit">Postar a receita!</Button>
        </Form>
      </Container>
    </Section>
  );
};
