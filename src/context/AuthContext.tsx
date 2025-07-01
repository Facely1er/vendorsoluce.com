import React, { createContext, useContext, useState, useEffect } from 'react';

// Define local interfaces to replace Supabase types
interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  user_metadata?: Record<string, any>;
}

interface Session {
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = 'vendorsoluce_auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session from localStorage
    const getInitialSession = () => {
      try {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setUser(parsedAuth.user);
          setSession({ user: parsedAuth.user });
        }
      } catch (error) {
        console.error('Error getting session from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, this would validate credentials against a backend
      // For this local storage implementation, we'll just check if a user with this email exists
      
      // For demo purposes, always succeed with login if email and password are provided
      if (email && password) {
        // Create a mock user
        const mockUser: User = {
          id: generateUserId(email),
          email: email,
          name: email.split('@')[0], // Use the part before @ as the name
          avatar_url: null
        };
        
        // Store in localStorage
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: mockUser }));
        
        // Update state
        setUser(mockUser);
        setSession({ user: mockUser });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Create a mock user
      const mockUser: User = {
        id: generateUserId(email),
        email: email,
        name: fullName,
        avatar_url: null,
        user_metadata: {
          full_name: fullName
        }
      };
      
      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: mockUser }));
      
      // Update state
      setUser(mockUser);
      setSession({ user: mockUser });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Remove from localStorage
      localStorage.removeItem(AUTH_STORAGE_KEY);
      
      // Update state
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Helper function to generate a consistent user ID from email
  const generateUserId = (email: string): string => {
    // Simple hash function to generate a deterministic ID from email
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to a string ID
    return `user-${Math.abs(hash).toString(16)}`;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session,
        isAuthenticated: !!user, 
        login, 
        register,
        logout, 
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};