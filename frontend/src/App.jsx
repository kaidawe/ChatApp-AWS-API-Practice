import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./RouteGuard";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Login from "./Login";
import Home from "./Home";

import ChatGPT from "./ChatGPT/ChatGPT";

const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    // identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    ],
  },
};
Amplify.configure(amplifyConfig);


function NavBar() {
  const { user } = useAuthenticator((context) => [context.user]);
  // here you would change the links on the nav bar depending if someone is logged in or not 
  return (
    <nav>
      <Link to="/">Home  </Link>
      <Link to="/">ChatGPT</Link>
    </nav>
  );
}


export default function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <RouteGuard>
                  <ChatGPT />
                </RouteGuard>
              }
            />
            <Route
              path="/home"
              element={
                <RouteGuard>
                  <Home />
                </RouteGuard>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}