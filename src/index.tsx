import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './app';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(
  <Auth0Provider
    domain="strumenti.us.auth0.com"
    clientId="Gnt4XuNd83SgbJOC2qjEb3X30oAnJMnM"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
