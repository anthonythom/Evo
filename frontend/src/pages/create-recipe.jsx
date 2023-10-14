import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";


const Section = styled.div`
  height: auto;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin-top: 250px;

  display: flex;

  gap: 50px;
  height: auto;
  background-color: #f8ad84;
  box-shadow: 0 8px 32px 0 rgba(17, 17, 17, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 10px 10px 0px 0px;


  justify-content: center;
  width: 37%;

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

const Left = styled.div`
  
`;

const Title = styled.h1`
  margin-top: 35px;
  display: flex;
  font-size: 3rem;
  font-weight: 200px;
  justify-content: center;
  color: #ffffff;
`;



const Form = styled.form`
  width: 500px;
  display: flex;

  flex-direction: column;
  gap: 25px;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #fdfcff52;
  border: none;
  border-radius: 5px;
  color: #fcfcfc;
 
  
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
   color: #fcfcfc ;
  background-color: #fdfcff52;
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

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
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