import {React, useState, useEffect, createContext} from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { SelectUnstyledContext } from '@mui/base';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD49xFLjyyQAZs0TZIu3lMzyGdDXpG8tHA",
  authDomain: "shopping-list-bee51.firebaseapp.com",
  projectId: "shopping-list-bee51",
  storageBucket: "shopping-list-bee51.appspot.com",
  messagingSenderId: "547898215346",
  appId: "1:547898215346:web:7280c417b764881a8172ab",
  databaseURL: "https://shopping-list-bee51-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

// emails = doc(db, 'emails');

const getEmails = () => {
	const dbRef = ref(db);
	get(child(dbRef, 'emails')).then((snapshot) => {
	if (snapshot.exists()) {
		// console.log(snapshot.val());
		return snapshot.val();
	} else {
		console.log("No data available");
	}
	}).catch((error) => {
		console.error(error);
	});
}

// export const AuthContext = createContext()

// export const AuthContextProvider = props => {
// 	const [user, setUser] = useState()
// 	const [error, setError] = useState()
  
// 	useEffect(() => {
// 	  const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
// 	  return () => unsubscribe()
// 	}, [])
// 	return <AuthContext.Provider value={{ user, error }} {...props} />
//   }

onAuthStateChanged(auth, user => {
	console.log("You are logged in as ", user);
	if (user != null)
		console.log(user.displayName)

	const dbRef = ref(db);
	get(child(dbRef, 'emails')).then((snapshot) => {
	if (snapshot.exists()) {
		// console.log(snapshot.val());
		var emails = snapshot.val();
		if(user != null && !emails.includes(user.email)) {
			signOut(auth);
			throw Error("Hold on now... you weren't supposed to try to use this!\nNow I shake my fist at firebase for not implementing a real solution to prevent user sign up. Goodbye.");
		}
	} else {
		console.log("No data available");
	}
	}).catch((error) => {
		console.error(error);
	});

	// if(user != null && user.email != "redacted@gmail.com" && user.email != "redacted@gmail.com") {	
	// 	signOut(auth);
	// 	throw Error("Hold on now... you weren't supposed to try to use this!\nNow I shake my fist at firebase for not implementing a real solution to prevent user sign up. Goodbye.")
	// }
	// useEffect(() => {
	// 	setName(auth.currentUser.displayName)
	// });
	});

const Shopping = () => {
	// const [name, setName] = useState(null);
	// useEffect(() => {
	// 	console.log("foo");
	// 	setName(auth.currentUser.displayName)
	// });

	return (
		<>
		<h1>Shopping</h1>
		{/* { name != null && <p>Hello {name}!</p>} */}
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
