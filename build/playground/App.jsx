import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import LandingPage from '../components/LandingPage';
import AboutPage from '../components/AboutPage';
const JohnSmith = {
    id: '1',
    email: 'test@yopmail.com',
    name: 'John',
    surname: 'Smith'
};
const authorizedProps = {
    links: [
        { title: 'dashboard' },
        { title: 'aboute' },
    ],
    usersMenu: [{ title: 'signout', to: '/' }],
    user: JohnSmith,
};
const notAuthorizedProps = {
    links: [
        { title: 'aboute' },
        { title: 'signin' }
    ],
    user: null
};
export const history = createBrowserHistory({ basename: '/' });
export const App = () => {
    const [user, setUser] = useState(null);
    const handleClick = (link) => {
        if (link.title === 'signin') {
            setUser(JohnSmith);
        }
        else {
            setUser(null);
        }
        if (link.title === 'aboute') {
            history.push('/aboute');
        }
    };
    return (<>
      <Header logo={{ title: 'Tickers', to: '/' }} links={user ? authorizedProps.links : notAuthorizedProps.links} onClick={handleClick} usersMenu={user ? authorizedProps.usersMenu : []} user={user} onUserClick={() => setUser(null)}/>
      <Main>
        <Router history={history}>
          <Switch>
            <Route path="/aboute" exact component={() => (<AboutPage />)}/>
            <Route path="/" component={() => (<LandingPage onClickManagePortfolio={() => console.log('Manage portfolio click')}/>)}/>
          </Switch>
        </Router>
      </Main>
      <Footer />
    </>);
};
