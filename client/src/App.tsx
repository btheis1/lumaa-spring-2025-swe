
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const authToken = cookies.AuthToken;
  const id = cookies.Id;
  const username = cookies.Username;
  
  useEffect(() => {
    if (authToken) {
      console.log('Logged in!', id);

    }
  }, [authToken]);

  return (
    <div>
      <h1>Task Manager App</h1>
      {!authToken && <Auth />}
      {authToken &&
        <>
          {
            <h1>You're logged in, baby!</h1>
          }
        </>
      }
    </div>
  );
}

export default App;
