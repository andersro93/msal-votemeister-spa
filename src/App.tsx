import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';

import msalInstance from './_shared/Msal/MsalInstance';

import FrontPage from './Frontpage/FrontPage';
import VotePage from './Vote/Pages/VotePage';
import ResultsPage from './Results/Pages/ResultsPage';

const App: React.FC = () => {
  const accounts = msalInstance.getAllAccounts();

  useEffect(() => {
    if(accounts && msalInstance.getActiveAccount() === null) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }, [accounts]);

  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/vote" component={VotePage} />
          <Route path="/results" component={ResultsPage} />
        </Switch>
      </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
