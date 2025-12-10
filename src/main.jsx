import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";


import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./Contexts/AuthContext";

const clientId =
  "1083223003406-b78mdntufb75hg2srm1uuritag9bcf8f.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
