import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from "./components/navbar";
import styled from "styled-components";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRp9yhn1HfPj1yhoQsxLwfifblynDEtak",
  authDomain: "evopass-4d0d2.firebaseapp.com",
  projectId: "evopass-4d0d2",
  storageBucket: "evopass-4d0d2.appspot.com",
  messagingSenderId: "289413368452",
  appId: "1:289413368452:web:dab0100997a9ca9db910d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Section = styled.div`
display: flex;


`;


const Container = styled.div`
  height: 100vh;
  width: 100vw;

  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: #e1e1e6;
  background-image: conic-gradient(
    from 90deg at 50% 100%,
    #ffffffe0 90deg,
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