// src/pages/SignIn.js
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
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await auth.signOut(); // Sign out immediately to prevent access
        setVerificationMessage(`Your email is not verified. Please check your email for a verification link.`);
        return;
      }

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-page">
      <h1>Sign In</h1>
      {error && <p className="error-message">{error}</p>}
      {verificationMessage && <p className="verification-message">{verificationMessage}</p>}
      <Notice />
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
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
        <button type="submit">Sign In with Email</button>
      </form>
    </div>
  );
};

export default SignIn;
