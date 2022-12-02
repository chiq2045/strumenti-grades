import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './app';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(
  <Auth0Provider
    domain="strumenti.us.auth0.com"
    clientId="Gnt4XuNd83SgbJOC2qjEb3X30oAnJMnM"
    redirectUri={window.location.origin}
    audience="https://strumenti.us.auth0.com/api/v2"
    scope="read:grades update:grades create:grades delete:grades"
  >
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Auth0Provider>
);
