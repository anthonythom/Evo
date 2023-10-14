import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import styled from "styled-components";


const Section = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 500px;

`;

const Title = styled.a`
  
 font-size: 80px;

 
  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--accent-color);

  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;
color: black;
  &:hover {
    filter: brightness(0.85);

  }
  &:active {
    filter: brightness(1);
  }

`;

const Container = styled.div`

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
      };
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      };
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
    };
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <Section>
      <Title>Receitas</Title>
      <Container>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
      </Container>
    </Section>
  );
};