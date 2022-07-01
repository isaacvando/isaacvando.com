import {React, useState, useEffect, createContext} from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { initializeApp } from "firebase/app";
import { } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, beforeSignIn} from 'firebase/auth';

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

export const AuthContext = createContext()

export const AuthContextProvider = props => {
	const [user, setUser] = useState()
	const [error, setError] = useState()
  
	useEffect(() => {
	  const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
	  return () => unsubscribe()
	}, [])
	return <AuthContext.Provider value={{ user, error }} {...props} />
  }

onAuthStateChanged(auth, user => {
	console.log("You are logged in as ", user);
	console.log(`auth: ${auth}`);

	if(user != null && user.email != "redacted@gmail.com" && user.email != "redacted@gmail.com") {
		signOut(auth);
		throw Error("Hold on now... you weren't supposed to try to use this!\nNow I shake my fist at firebase for not implementing a real solution to prevent user sign up. Goodbye.")
	}
});

const Shopping = () => {

	
	return (
		<>
		<h1>Shopping</h1>
		<Button variant="outlined" onClick={() => logIn()}>Log in</Button>
		<Button variant="outlined" onClick={() => signOut(auth)}>Log out</Button>
		<hr className="Separator"></hr>
		</>
	)
};

const logIn = async () => {
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
