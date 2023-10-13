import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const Section = styled.div`
  display: flex;
 flex-wrap: wrap;
 flex-direction: column;
  height: 100vh;
  width: 100vw;
  gap: 20px;
  margin-top: 20rem;
  justify-content: center;
 
  align-items: center;


  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #000000;

  h1 {
    font-size: 100px;
  }
  h2 {
    font-size: 50px;
  }
  p {
    font-size: 20px;
  }

  background-image: conic-gradient(
    from 90deg at 50% 100%,
    #ffffff 0deg,
    #ffffffea 90deg,
    #ff6f00 1.9turn
  );
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
      <div><h1>Receitas</h1></div>
      

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
               <img src={recipe.imageUrl} alt={recipe.name} />
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Salvo" : "Salvar"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
           
            <p>Tempo de cozimento: {recipe.cookingTime} Minutos</p>
          </li>
        ))}
      </ul>

    </Section>
  );
};
