import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
	children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
	const loginWithGoogle = async () => {
		const login =await signIn('google');
		console.log(login,'login with google');
	};

	return (
		<Button onClick={loginWithGoogle} className="w-full">
			{children}
		</Button>
	);
};

export default GoogleSignInButton;
