// src/pages/VerifyEmail.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigate('/signin');
      } else {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please verify your email to continue.</p>
    </div>
  );
};

export default VerifyEmail;
