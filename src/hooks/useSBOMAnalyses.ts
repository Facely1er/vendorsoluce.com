import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type SBOMAnalysis = {
  id: string;
  user_id: string;
  filename: string;
  file_type: string;
  total_components: number | null;
  total_vulnerabilities: number | null;
  risk_score: number | null;
  analysis_data: any | null;
  created_at: string;
  updated_at: string;
};

type SBOMAnalysisInsert = Omit<SBOMAnalysis, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

const SBOM_ANALYSES_STORAGE_KEY = 'vendorsoluce_sbom_analyses';

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
      
      // Get analyses from localStorage
      const storedAnalyses = localStorage.getItem(SBOM_ANALYSES_STORAGE_KEY);
      if (storedAnalyses) {
        const allAnalyses: SBOMAnalysis[] = JSON.parse(storedAnalyses);
        // Filter analyses for current user
        const userAnalyses = allAnalyses.filter(analysis => analysis.user_id === user.id);
        // Sort by created_at in descending order (newest first)
        userAnalyses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setAnalyses(userAnalyses);
      } else {
        setAnalyses([]);
      }
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
      // Generate a unique ID
      const id = `sbom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create new analysis object with timestamps
      const newAnalysis: SBOMAnalysis = {
        ...analysisData,
        id,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Get existing analyses from localStorage
      const storedAnalyses = localStorage.getItem(SBOM_ANALYSES_STORAGE_KEY);
      const allAnalyses: SBOMAnalysis[] = storedAnalyses ? JSON.parse(storedAnalyses) : [];
      
      // Add new analysis
      allAnalyses.push(newAnalysis);
      
      // Save back to localStorage
      localStorage.setItem(SBOM_ANALYSES_STORAGE_KEY, JSON.stringify(allAnalyses));
      
      // Update state
      setAnalyses(prev => [newAnalysis, ...prev]);
      
      return newAnalysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create SBOM analysis');
      throw err;
    }
  };

  const deleteAnalysis = async (id: string) => {
    try {
      // Get existing analyses from localStorage
      const storedAnalyses = localStorage.getItem(SBOM_ANALYSES_STORAGE_KEY);
      if (!storedAnalyses) return;
      
      const allAnalyses: SBOMAnalysis[] = JSON.parse(storedAnalyses);
      
      // Remove the specified analysis
      const updatedAnalyses = allAnalyses.filter(analysis => 
        !(analysis.id === id && analysis.user_id === user?.id)
      );
      
      // Save back to localStorage
      localStorage.setItem(SBOM_ANALYSES_STORAGE_KEY, JSON.stringify(updatedAnalyses));
      
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