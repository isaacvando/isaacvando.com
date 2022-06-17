import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";

const Shopping = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	
  return (
    <>
      <h1>Shopping</h1>
			{isAuthenticated ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton> }
      <hr className="Separator"></hr>
			<Profile></Profile>
    </>
  );
};

export default Shopping;
