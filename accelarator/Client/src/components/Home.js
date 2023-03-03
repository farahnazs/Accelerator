import React from 'react'
import SignIn from './SignIn';
import './SignIn.css';
import useAuth from "../hooks/useAuth";

function Home() {
  const { auth } = useAuth();

  return (
    <div>

      {/* {!auth.loginStatus && <SignIn />} */}
      {auth.role? 
      <h1> Welcome </h1>
      :<SignIn />}


    </div>
  )
}

export default Home
