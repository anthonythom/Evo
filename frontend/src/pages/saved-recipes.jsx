import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  font-weight: 700;
  flex-wrap: wrap;
  text-align: center;
width: 100%;
height: 100vh;
  background-image: url("bg-food.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: "Poppins", sans-serif;
  font-size: 35px;
  color: #ffffff;
`;

const Title2 = styled.p`
  font-size: 35px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Container = styled.div``;

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

  height: auto;


background: rgba(221, 218, 218, 0.37);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(8.7px);
-webkit-backdrop-filter: blur(8.7px);
border: 1px solid rgba(221, 218, 218, 0.7);
padding-bottom: 40px;
  justify-content: center;
`;
const P = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");
  margin-left: 25px;
  font-size: 25px;
  width: 500px;
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Img = styled.img`
  width: 500px;
  height: 300px;
  border-radius: 20px;
`;


export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <Section>
    <Container>
    
      <Title>Receitas Salvas</Title>
      <Ul>
        {savedRecipes.map((recipe) => (
          <Li key={recipe._id}>
            <div>
              <Title2>{recipe.name}</Title2>
            </div>
            <P>{recipe.description}</P>
            
            <Img src={recipe.imageUrl} alt={recipe.name} />
            <P>Tempo de preparo: {recipe.cookingTime} minutos</P>
          </Li>
        ))}
      </Ul>
    
    </Container>
    </Section>
  );
};