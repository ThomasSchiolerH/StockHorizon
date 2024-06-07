import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import '../styles/SignUp.css';
import Notice from '../components/Notice';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      navigate('/signin', { state: { emailVerificationSent: true, email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <Notice />
      <button onClick={handleGoogleSignIn} className="google-button">
        <img src="/google-logo.png" alt="Google logo" />
        Sign Up with Google
      </button>
      <form onSubmit={handleEmailSignUp}>
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
        <button type="submit">Sign Up with Email</button>
      </form>
      <p className="signin-link">
        Already have an account? <button onClick={() => navigate('/signin')} className="button">Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;
