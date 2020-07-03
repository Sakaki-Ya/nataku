import React, { useState, useEffect } from "react";
import { auth } from "./Functions/Firebase";

export const AuthContext = React.createContext<{
  user: firebase.User | null;
}>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
