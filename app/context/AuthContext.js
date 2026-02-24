


'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('userToken');
      console.log('Stored user:', storedUser);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, token) => {
    console.log('Logging in user:', userData, token);
    if (!userData || !token) {
      console.error('Login called with invalid data', { userData, token });
      return;
    }
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userToken', token);
    setUser(userData);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setUser(null);
  }, []);

  // isAuthenticated is derived purely from React state (not localStorage directly)
  // so it updates reactively when login/logout is called
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        error,
        setError,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


