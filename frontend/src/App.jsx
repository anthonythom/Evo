import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from "./components/navbar";
import styled from "styled-components";


const Section = styled.div`
display: flex;


`;


const Container = styled.div`
  height: 100vh;
  width: 100vw;

  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: #000000;
  background-image: conic-gradient(
    from 90deg at 50% 100%,
    #ffffffdf 90deg,
    #ffffff 5.8turn
  );

  &::-webkit-scrollbar {
    display: none;
  }

`;









function App() {
  return (
    <Section>
    <Container>
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Container>
    </Section>
  );
}

export default App;