import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type SBOMAnalysis = Database['public']['Tables']['sbom_analyses']['Row'];
type SBOMAnalysisInsert = Database['public']['Tables']['sbom_analyses']['Insert'];

export const useSBOMAnalyses = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<SBOMAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyses = async () => {
    if (!user) {
      setAnalyses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('sbom_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAnalyses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch SBOM analyses');
    } finally {
      setLoading(false);
    }
  };

  const createAnalysis = async (analysisData: Omit<SBOMAnalysisInsert, 'user_id'>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const newAnalysisData: SBOMAnalysisInsert = {
        ...analysisData,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('sbom_analyses')
        .insert(newAnalysisData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update state
      setAnalyses(prev => [data, ...prev]);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create SBOM analysis');
      throw err;
    }
  };

  const deleteAnalysis = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sbom_analyses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      // Update state
      setAnalyses(prev => prev.filter(analysis => analysis.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete SBOM analysis');
      throw err;
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, [user]);

  return {
    analyses,
    loading,
    error,
    createAnalysis,
    deleteAnalysis,
    refetch: fetchAnalyses,
  };
};