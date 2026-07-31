import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('fitverse_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on load if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await apiCall('/user/profile', 'GET', null, token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', 'POST', { email, password });
      setToken(data.token);
      localStorage.setItem('fitverse_token', data.token);
      
      // Fetch user profile after login
      const userData = await apiCall('/user/profile', 'GET', null, data.token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiCall('/auth/register', 'POST', userData);
      setToken(data.token);
      localStorage.setItem('fitverse_token', data.token);
      
      const newUserData = await apiCall('/user/profile', 'GET', null, data.token);
      setUser(newUserData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fitverse_token');
    sessionStorage.removeItem('fitverse_token');
  };

  const updateUserProfile = async (updatedFields) => {
    try {
      const updatedUser = await apiCall('/user/profile', 'PUT', updatedFields, token);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  const addXP = async (amount) => {
    if (!user) return;
    
    let newXP = user.xp + amount;
    let newLevel = user.level;
    let nextXp = Math.round(1000 * Math.pow(1.3, newLevel - 1)); // Rough logic

    if (newXP >= nextXp) {
      newLevel += 1;
      newXP = newXP - nextXp;
    }

    try {
      await updateUserProfile({ xp: newXP, level: newLevel });
    } catch (error) {
      console.error("Failed to add XP:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, updateUserProfile, addXP, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
