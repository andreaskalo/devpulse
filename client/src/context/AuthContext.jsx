import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  async function login(identifier, password) {    
    if (!identifier) {
      return {
        success: false,
        error: "Please insert username or email.",
      };
    }

    if (!password) {
      return {
        success: false,
        error: "Please insert password.",
      };
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data?.error?.message ?? "Login failed.",
        };
      }

      await getCurrentUser();

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Unable to connect to the server.",
      };
    }
  }

  async function getCurrentUser() {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (!response.ok) {
        setCurrentUser(null);
        return;
      }

      setCurrentUser(data.user);
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthLoading,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
