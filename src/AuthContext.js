import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const storedUsername = localStorage.getItem('authUsername');
    const storedUserType = localStorage.getItem('authUserType');
    if (storedUsername && storedUserType) {
      setAuth({ username: storedUsername, userType: storedUserType });
    }
  }, []);

  const login = (username, userType) => {
    localStorage.setItem('authUsername', username);
    localStorage.setItem('authUserType', userType);
    setAuth({ username, userType });
  };

  const logout = () => {
    localStorage.removeItem('authUsername');
    localStorage.removeItem('authUserType');
    setAuth({ username: null, userType: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
