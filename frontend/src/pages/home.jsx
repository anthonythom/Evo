import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  text-align: center;
`;

const Title = styled.a`
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: "Poppins", sans-serif;
  font-size: 50px;
  color: black;
`;

const Title2 = styled.p`
  font-size: 35px;
  font-weight: bolder;
  font-family: "Poppins", sans-serif;
  color: #343434;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Container = styled.div`

`;

const Ul = styled.ul`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
  gap: 50px;
`;

const Li = styled.li`
  width: 550px;
  border-radius: 20px;
  border: 1px solid;
  height: auto;
 

  background-color: #e0dbd9;
  box-shadow: 0 8px 30px 0 rgba(17, 17, 17, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(13.5px);
  &:hover{
    background-color: yellow;
  }
`;
const P = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");
  margin-left: 25px;
  font-size: 25px;
  width: 500px;


  font-family: "Poppins", sans-serif;
  color: #343434;
  text-align: justify;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Img = styled.img`
  width: 500px;
  height: 300px;
  border-radius: 20px;
`;

const Button = styled.button`
margin-left: 10px;
width: 180px;
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
background-color: #000000;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
    background-color: #ffcc00;
    box-shadow: rgb(100 100 111 / 50%) 0 7px 29px 0;
  }
`;












export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <Section>
      <Title>Receitas</Title>
      <Container>
        <Ul>
          {recipes.map((recipe) => (
            <Li key={recipe._id}>
              <div>
                <Title2>{recipe.name}</Title2> 
                <Img src={recipe.imageUrl} alt={recipe.name} />
                 <P>Tempo de preparo: {recipe.cookingTime} minutos</P>
               
              </div>
              <div className="instructions">
                <P>{recipe.instructions}</P>
              </div>
             
              <Button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Salvo!" : "Salvar Receita!"}
                </Button>
                <br />
                <br />
            </Li>
          ))}
        </Ul>
      </Container>
    </Section>
  );
};
