import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import styled from "styled-components";




const Section = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
width: 100%;
height: auto;
  background-image: url("bg.png");
  background-repeat: space;
  background-size: cover;
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: "Poppins", sans-serif;
  font-size: 50px;
  color: #ffffff;
`;

const Title2 = styled.p`
  font-size: 35px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  color: #000000;
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

  background-color: rgba(225, 225, 225, 0.697);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;

  box-shadow: 0 8px 30px 0 rgba(17, 17, 17, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(13.5px);
  &:hover {
    background-color: rgba(255, 255, 255, 0.697);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  }
`;
const P = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");
  margin-left: 25px;
  font-size: 25px;
  width: 500px;
  font-family: "Poppins", sans-serif;
  color: #000000;
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