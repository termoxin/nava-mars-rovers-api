import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { RoverPage } from './pages/Rover';
import { HomePage } from './pages/Home';

import { NasaSDK } from './api/NasaSDK';
import 'antd/dist/antd.css';

const API_URL = process.env.REACT_APP_NASA_API_URL;
const API_KEY = process.env.REACT_APP_NASA_API_KEY;

if (API_URL && API_KEY) {
  NasaSDK.getInstance({
    url: API_URL,
    apiKey: API_KEY,
  });
} else {
  throw Error('Please, define env variables to make the app working');
}

const App: FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/:name" exact>
        <RoverPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
