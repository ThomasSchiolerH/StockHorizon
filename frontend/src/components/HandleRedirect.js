import { useEffect } from 'react';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error handling redirect:', error.message);
      });
  }, [navigate]);

  return null;
};

export default HandleRedirect;
