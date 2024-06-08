import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignIn.css';
import Notice from '../components/Notice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.emailVerificationSent) {
      setVerificationMessage(`A verification email has been sent to ${location.state.email}. Please check your email and verify your account before logging in.`);
    }
  }, [location]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        await auth.signOut();
        setVerificationMessage(`Your email is not verified. Please check your email for a verification link.`);
        return;
      }
  
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('No user found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid. Please enter a valid email.');
          break;
        default:
          setError('An error occurred. Please try again.');
          break;
      }
    }
  };  

  return (
    <div className="page-container">
      <div className="signin-page">
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        {verificationMessage && <p className="verification-message">{verificationMessage}</p>}
        {/* <Notice /> */}
        <div className="google-button-container">
          <button onClick={handleGoogleSignIn} className="google-button google-font">
            <img src="/google-logo.png" alt="Google logo" />
            Continue with Google
          </button>
        </div>
        <div className="or-separator">OR</div>
        <form onSubmit={handleEmailSignIn}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <button type="submit" className="email-signin-button">Sign In with Email</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
