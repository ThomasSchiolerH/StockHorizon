// src/pages/EmailActionHandler.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, applyActionCode } from 'firebase/auth';

const EmailActionHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');
    const actionCode = query.get('oobCode');

    if (mode === 'verifyEmail' && actionCode) {
      handleEmailVerification(actionCode);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleEmailVerification = async (actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      alert('Email verified successfully! Please log in.');
      navigate('/signin');
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('Error verifying email.');
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Handling Email Verification...</h1>
    </div>
  );
};

export default EmailActionHandler;
