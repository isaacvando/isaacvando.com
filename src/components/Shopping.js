import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const Shopping = () => {
	
  return (
    <>
      <h1>Shopping</h1>
      <hr className="Separator"></hr>
			<LoginButton></LoginButton>
			<LogoutButton></LogoutButton>
			<Profile></Profile>
    </>
  );
};

export default Shopping;
