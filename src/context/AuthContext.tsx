import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  markOnboardingComplete: (profileData?: {
    role?: string;
    company_size?: string;
    industry?: string;
  }) => Promise<void>;
   markTourComplete: () => Promise<void>;
   startTour: () => void;
   isTourRunning: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
   const [isTourRunning, setIsTourRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (error) throw error;

      // If no profile exists, create one
      if (!profileData || profileData.length === 0) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || '',
                is_first_login: true,
              },
            ])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);

          // New user should go to onboarding
          if (newProfile?.is_first_login) {
            navigate('/onboarding');
          }
        }
      } else {
        const profile = profileData[0];
        setProfile(profile);

        // Check if this is the first login
        if (profile?.is_first_login) {
          navigate('/onboarding');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            is_first_login: true,
          },
        ]);

      if (profileError) throw profileError;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate('/');
  };
  
  const signOut = logout; // Alias for backward compatibility

  const markOnboardingComplete = async (profileData?: {
    role?: string;
    company_size?: string;
    industry?: string;
  }) => {
    if (!user) return;

    try {
      const updateData: any = { is_first_login: false };
      
      // Add profile data if provided
      if (profileData) {
        if (profileData.role) updateData.role = profileData.role;
        if (profileData.company_size) updateData.company_size = profileData.company_size;
        if (profileData.industry) updateData.industry = profileData.industry;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      // Update local profile state
      setProfile((prev: any) => ({ ...prev, ...updateData }));

      // Navigate to dashboard after onboarding
      navigate('/dashboard');
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }
  };

   const markTourComplete = async () => {
     if (!user) return;
 
     try {
       const { error } = await supabase
         .from('profiles')
         .update({ tour_completed: true })
         .eq('id', user.id);
 
       if (error) throw error;
 
       // Update local profile state
       setProfile((prev: any) => ({ ...prev, tour_completed: true }));
       setIsTourRunning(false);
     } catch (error) {
       console.error('Error marking tour complete:', error);
     }
   };
 
   const startTour = () => {
     setIsTourRunning(true);
   };
  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    logout,
    markOnboardingComplete,
     markTourComplete,
     startTour,
     isTourRunning,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}