import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type Assessment = {
  id: string;
  user_id: string;
  assessment_name: string | null;
  overall_score: number | null;
  section_scores: any | null;
  answers: Record<string, string> | null;
  status: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

const ASSESSMENTS_STORAGE_KEY = 'vendorsoluce_assessments';

export const useSupplyChainAssessments = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = async () => {
    if (!user) {
      setAssessments([]);
      setCurrentAssessment(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get assessments from localStorage
      const storedAssessments = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
      if (storedAssessments) {
        const allAssessments: Assessment[] = JSON.parse(storedAssessments);
        
        // Filter assessments for current user
        const userAssessments = allAssessments.filter(assessment => assessment.user_id === user.id);
        
        // Sort by created_at in descending order (newest first)
        userAssessments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setAssessments(userAssessments);
        
        // Set current assessment to the most recent in_progress one
        const inProgress = userAssessments.find(a => a.status === 'in_progress');
        if (inProgress) {
          setCurrentAssessment(inProgress);
        }
      } else {
        setAssessments([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assessments');
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateAssessment = async (
    assessmentData: Partial<Assessment>, 
    answers: Record<string, string>
  ) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // Get existing assessments from localStorage
      const storedAssessments = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
      const allAssessments: Assessment[] = storedAssessments ? JSON.parse(storedAssessments) : [];
      
      if (currentAssessment) {
        // Update existing assessment
        const updatedAssessment = {
          ...currentAssessment,
          ...assessmentData,
          answers,
          updated_at: new Date().toISOString()
        };
        
        // Find and update the assessment in the array
        const updatedAssessments = allAssessments.map(a => 
          a.id === currentAssessment.id ? updatedAssessment : a
        );
        
        // Save back to localStorage
        localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(updatedAssessments));
        
        // Update state
        setCurrentAssessment(updatedAssessment);
        setAssessments(prev => prev.map(a => a.id === updatedAssessment.id ? updatedAssessment : a));
        
        return updatedAssessment;
      } else {
        // Create new assessment
        const newAssessment: Assessment = {
          id: `assessment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          user_id: user.id,
          assessment_name: assessmentData.assessment_name || 'Supply Chain Assessment',
          overall_score: null,
          section_scores: null,
          answers,
          status: 'in_progress',
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...assessmentData
        };
        
        // Add to array
        allAssessments.push(newAssessment);
        
        // Save to localStorage
        localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(allAssessments));
        
        // Update state
        setCurrentAssessment(newAssessment);
        setAssessments(prev => [newAssessment, ...prev]);
        
        return newAssessment;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save assessment');
      throw err;
    }
  };

  const completeAssessment = async (
    overallScore: number,
    sectionScores: any[]
  ) => {
    if (!currentAssessment || !user) {
      throw new Error('No current assessment to complete');
    }

    try {
      // Get existing assessments from localStorage
      const storedAssessments = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
      if (!storedAssessments) {
        throw new Error('No assessments found in storage');
      }
      
      const allAssessments: Assessment[] = JSON.parse(storedAssessments);
      
      // Update the current assessment
      const completedAssessment: Assessment = {
        ...currentAssessment,
        overall_score: overallScore,
        section_scores: sectionScores,
        status: 'completed',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Find and update the assessment in the array
      const updatedAssessments = allAssessments.map(a => 
        a.id === currentAssessment.id ? completedAssessment : a
      );
      
      // Save back to localStorage
      localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(updatedAssessments));
      
      // Update state
      setCurrentAssessment(null); // Clear current assessment since it's completed
      setAssessments(prev => prev.map(a => a.id === completedAssessment.id ? completedAssessment : a));
      
      return completedAssessment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete assessment');
      throw err;
    }
  };

  const deleteAssessment = async (id: string) => {
    try {
      // Get existing assessments from localStorage
      const storedAssessments = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
      if (!storedAssessments) return;
      
      const allAssessments: Assessment[] = JSON.parse(storedAssessments);
      
      // Remove the specified assessment
      const updatedAssessments = allAssessments.filter(assessment => 
        !(assessment.id === id && assessment.user_id === user?.id)
      );
      
      // Save back to localStorage
      localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(updatedAssessments));
      
      // Update state
      setAssessments(prev => prev.filter(a => a.id !== id));
      if (currentAssessment?.id === id) {
        setCurrentAssessment(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete assessment');
      throw err;
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [user]);

  return {
    assessments,
    currentAssessment,
    loading,
    error,
    createOrUpdateAssessment,
    completeAssessment,
    deleteAssessment,
    refetch: fetchAssessments,
  };
};