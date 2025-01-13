"use client"
import React from 'react';
import {useSession} from 'next-auth/react'

const page = () => {
	const session=  useSession()
	console.log(session,"session")
	return <div>Welcome to admin</div>;
};

export default page;
