import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import styled from "styled-components";



const Section = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
  display: flex;
justify-content: center;
  flex-wrap: wrap;
  text-align: center;
`;

const Title = styled.p`
margin-top: 50px;
margin-bottom: 50px;
font-family: 'Poppins', sans-serif;
  font-size: 50px;
  color: black;
 
`;

const Title2 = styled.p`
  font-size: 25px;

 font-weight: bolder;
  font-family: 'Poppins', sans-serif;
  color: #343434;
 
`;

const Container = styled.div`


`;


const Ul = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Li = styled.div`
  width: 500px;
`;

const P = styled.p`


font-size: 25px;
font-weight: bolder;
 font-family: 'Poppins', sans-serif;
 color: #343434;

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
            <P>Cooking Time: {recipe.cookingTime} minutes</P>
          </Li>
        ))}
      </Ul>
    
    </Container>
    </Section>
  );
};