
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'analyst';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de token existente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulação de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Usuários demo
    const demoUsers: Record<string, User> = {
      'admin@lab.com': {
        id: '1',
        name: 'Dr. Ana Silva',
        email: 'admin@lab.com',
        role: 'admin'
      },
      'user@lab.com': {
        id: '2',
        name: 'Carlos Santos',
        email: 'user@lab.com',
        role: 'user'
      },
      'analyst@lab.com': {
        id: '3',
        name: 'Maria Oliveira',
        email: 'analyst@lab.com',
        role: 'analyst'
      }
    };

    const authenticatedUser = demoUsers[email];
    if (authenticatedUser && password === 'demo123') {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
