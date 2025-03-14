import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router';
import { User } from '@tickers-app/common/types/User';
import { Header, UNAUTHORIZED_HEADER } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import LandingPage from '../components/LandingPage';
import { Link } from '../types/Link';
import AboutPage from '../components/AboutPage';
import { DashboardSkeletons } from '../components/skeletons/DashboardSkeletons';
import { AUTHORIZED_HEADER, BASE_HEADER_OPTIONS } from '../components/Header/constants';

const JohnSmith: User = {
  id: '1',
  email: 'test@yopmail.com',
  name: 'John',
  surname: 'Smith'
};

const UserWithEmailOnly: User = {
  id: '1',
  email: 'test@yopmail.com',
};

const authorizedProps: { links: Link [], user: User, usersMenu: Link []} = {
  links: [
    { title: 'dashboard' },
    { title: 'aboute' },
  ],
  usersMenu: [{ title: 'signout', to: '/' }],
  user: JohnSmith,
};

const notAuthorizedProps: { links: Link [], user: null} = {
  links: [
    { title: 'aboute' },
    { title: 'signin' }
  ],
  user: null
};

export const history = createBrowserHistory({ basename: '/' });

export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setUser(UserWithEmailOnly);
    }, 3000);
  }, []);

  const handleClick = (link: Link) => {
    if (link.title === 'signin') {
      setUser(UserWithEmailOnly);
    } else {
      setUser(null);
    }

    if (link.title === 'aboute') {
      history.push('/aboute');
    }
  };

  return (
    <>
      <Header
        logo={{ title: 'Tickers', to: '/' }}
        links={isLoading
          ? BASE_HEADER_OPTIONS
          : user ? AUTHORIZED_HEADER : UNAUTHORIZED_HEADER}
        onClick={handleClick}
        usersMenu={user ? authorizedProps.usersMenu : []}
        user={user}
        isLoading={isLoading}
        onUserClick={() => setUser(null)}
      />
      <Main>
        <Router history={history}>
          <Switch>
            <Route path="/aboute" exact component={() => (<AboutPage />)} />
            <Route
              path="/"
              component={() => (isLoading
                ? <DashboardSkeletons />
                : <LandingPage />)}
            />
          </Switch>
        </Router>
      </Main>
      <Footer />
    </>
  );
};
