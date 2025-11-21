/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!state.token) {
        dispatch({ type: 'STOP_LOADING' });
        return;
      }
      try {
        const { data } = await api.get('/api/user/profile');
        dispatch({ type: 'SET_USER', payload: data.data });
      } catch (error) {
        console.error('Profile fetch failed', error);
        localStorage.removeItem('auth_token');
        dispatch({ type: 'LOGOUT' });
      }
    };

    fetchProfile();
  }, [state.token]);

  const login = ({ token, user }) => {
    localStorage.setItem('auth_token', token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.user && state.token),
      login,
      logout,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

