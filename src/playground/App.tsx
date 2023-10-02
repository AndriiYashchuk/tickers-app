import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';

const JohnSmith = {
  name: 'John',
  surname: 'Smith'
}

export const App = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <Header
        buttons={['Dashboard', 'About', 'Login']}
        onClick={(key) => {
          if(key === 'Login'){
            setUser(JohnSmith);
          } else {
            setUser(null)
          }
        }}
        user={user}
      />
      <Main />
      <Footer />
    </>
  )
}
