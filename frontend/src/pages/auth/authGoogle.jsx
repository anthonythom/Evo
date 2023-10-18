import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import styled from "styled-components";




const ButtonG = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  img {
    width: 30px;
  }
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  border: 1px;
  border-style: solid;
  border-radius: 50px;
  color: #fff;
  background: transparent;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #F29F05;
    transition: 1.2s;
    box-shadow: rgb(100 100 111 / 50%) 0 7px 29px 0;
  }
`;


const AuthGoogle = () => {

    const [value, setValue] = useState("");



    const handleClick = () => {
        
      signInWithPopup(auth, provider).then((data) => {
        
        setValue(data.user.email);
     localStorage.setItem("email", data.user.email);
      });
      

    };
  
    useEffect(() => {
      setValue(localStorage.getItem("email"));
      
    });


  return (
    <ButtonG onClick={handleClick}>
     com conta google <img src="/googlelogo.png" />
  </ButtonG>
  )
}

export default AuthGoogle;