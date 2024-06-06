import { useEffect } from 'react';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          // User signed in successfully
          navigate('/');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }, [navigate]);

  return null;
};

export default HandleRedirect;
