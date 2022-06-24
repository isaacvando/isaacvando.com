import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { initializeApp } from "firebase/app";
import { } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD49xFLjyyQAZs0TZIu3lMzyGdDXpG8tHA",
  authDomain: "shopping-list-bee51.firebaseapp.com",
  projectId: "shopping-list-bee51",
  storageBucket: "shopping-list-bee51.appspot.com",
  messagingSenderId: "547898215346",
  appId: "1:547898215346:web:7280c417b764881a8172ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
	console.log("You are logged in as ", user);
});



const Shopping = () => {

	
	return (
		<>
		<h1>Shopping</h1>
		<Button variant="outlined" onClick={() => signIn()}>Log in</Button>
		<hr className="Separator"></hr>
		</>
	)
};

const signIn = async () => {
	var result = await signInWithPopup(auth, new GoogleAuthProvider)
	return result;
}

export default Shopping;


// const { user, isAuthenticated, isLoading } = useAuth0();
// return (
  //   <>
  //     <h1>Shopping</h1>
	// 		{isAuthenticated ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton> }
  //     <hr className="Separator"></hr>
	// 		<Profile></Profile>
  //   </>
  // );
