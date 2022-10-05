// import {React, useState, useEffect, createContext} from 'react';
// import Button from '@mui/material/Button';
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get, onValue} from "firebase/database";
// import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyD49xFLjyyQAZs0TZIu3lMzyGdDXpG8tHA",
//   authDomain: "shopping-list-bee51.firebaseapp.com",
//   projectId: "shopping-list-bee51",
//   storageBucket: "shopping-list-bee51.appspot.com",
//   messagingSenderId: "547898215346",
//   appId: "1:547898215346:web:7280c417b764881a8172ab",
//   databaseURL: "https://shopping-list-bee51-default-rtdb.firebaseio.com"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);

// const Shopping = () => {
// 	const [name, setName] = useState(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);
// 	const [list, setList] = useState([]);
// 	const listRef = ref(db, 'list');

// 	return (
// 		<>
// 		<h1>Shopping</h1>
// 		{/* {name != null && <p>Hello {name}!</p>} */}
// 		{ isAuthenticated ?<Button variant="outlined" onClick={() => logOut(setIsAuthenticated)}>Log out</Button>
// 		: <Button variant="outlined" onClick={() => logIn(setIsAuthenticated)}>Log in</Button>}
// 		<hr className="Separator"></hr>
// 		</>
// 	)
// };

// const logIn = async (setIsAuthenticated) => {
// 	var result = await signInWithPopup(auth, new GoogleAuthProvider())
// 	setIsAuthenticated(true);
// 	return result;
// }

// const logOut = (setIsAuthenticated) => {
// 	signOut(auth);
// 	setIsAuthenticated(false);
// }

// onAuthStateChanged(auth, user => {
// 	console.log("You are logged in as ", user);
// 	const dbRef = ref(db);
// 	get(child(dbRef, 'emails')).then((snapshot) => {
// 	if (snapshot.exists()) {
// 		var emails = snapshot.val();
// 		if(user != null && !emails.includes(user.email)) {
// 			signOut(auth);
// 			throw Error("Hold on now... you weren't supposed to try to use this!\nNow I shake my fist at firebase for not implementing a real solution to prevent user sign up. Goodbye.");
// 		}
// 	}
// 	}).catch((error) => {
// 		console.error(error);
// 	});
// });

// export default Shopping;
