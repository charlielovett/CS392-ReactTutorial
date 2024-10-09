import { NavLink } from 'react-router-dom';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

const SignInButton = () => (
    <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <button className="ms-auto btn btn-dark" onClick={handleSignOut}>Sign out</button>
    );
};

const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
};

const Navigation = () => (
    <nav className="d-flex p-3 border-bottom shadow-sm">
        <AuthButton />
    </nav>
);

export default Navigation;