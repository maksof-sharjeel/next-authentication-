"use client"
import React from 'react';
import {useSession} from 'next-auth/react'

const page = () => {
	const session=  useSession()
	return <div>Welcome to admin</div>;
};

export default page;
