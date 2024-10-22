import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, AuthResponse, TwoFactorResponse } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<TwoFactorResponse | void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await fetchUser();
        }
      } catch (error) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>('/api/user');
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse | TwoFactorResponse>('/api/auth/login', {
        email,
        password,
      });

      // Check if 2FA is required
      if ('tempToken' in response.data) {
        return response.data;
      }

      // If no 2FA required, proceed with normal login
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  // Rest of the useAuth hook remains the same...
  // [Previous useAuth code continues here]
}