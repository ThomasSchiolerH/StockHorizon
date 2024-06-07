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
    setError(''); // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      navigate('/signin', { state: { emailVerificationSent: true, email } });
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use. Please use a different email.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid. Please enter a valid email.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please enter a stronger password.');
          break;
        default:
          setError('An error occurred. Please try again.');
          break;
      }
    }
  };
  

  return (
    <div className="page-container">
      <div className="signup-page">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {/* <Notice /> */}
        <div className="google-button-container">
          <button onClick={handleGoogleSignIn} className="google-button">
            <img src="/google-logo.png" alt="Google logo" />
            Continue with Google
          </button>
        </div>
        <div className="or-separator">OR</div>
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
    </div>
  );
};

export default SignUp;
