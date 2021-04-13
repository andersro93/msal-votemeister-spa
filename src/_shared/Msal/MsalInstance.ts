import { PublicClientApplication } from '@azure/msal-browser';

const clientId = process.env.REACT_APP_AUTH_CLIENT_ID as string;

const msalInstance = new PublicClientApplication({
  auth: {
    clientId,
  },
});

export default msalInstance;
