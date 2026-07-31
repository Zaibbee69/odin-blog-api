import { useState, useCallback } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";

/**
 * Auth state lives here, backed by localStorage under the "token"
 * key. The JWT itself carries { sub, email, isAuthor, exp } in its
 * payload (see your loginUser controller), so on load we decode it
 * to reconstruct `currentUser` instead of storing a separate object.
 */
function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const json = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isTokenExpired(decoded) {
  if (!decoded?.exp) return false;
  return Date.now() >= decoded.exp * 1000;
}

function getStoredAuth() {
  const token = localStorage.getItem("token");
  if (!token) return { token: null, user: null };

  const decoded = decodeJwtPayload(token);
  if (!decoded || isTokenExpired(decoded)) {
    localStorage.removeItem("token");
    return { token: null, user: null };
  }
  return { token, user: decoded };
}

function App() {
  const [{ token: authToken, user: currentUser }, setAuth] =
    useState(getStoredAuth);

  const handleLoginSuccess = useCallback((token, user) => {
    localStorage.setItem("token", token);
    setAuth({ token, user });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home currentUser={currentUser} onLogout={handleLogout} />}
      />
      <Route
        path="/posts/:id"
        element={
          <BlogPost
            currentUser={currentUser}
            authToken={authToken}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />
    </Routes>
  );
}

export default App;
