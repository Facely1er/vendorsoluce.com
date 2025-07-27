import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessments/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';
import { useSupplyChainAssessments } from '../hooks/useSupplyChainAssessments';

interface SectionScore {
  title: string;
  percentage: number;
  completed: boolean;
}

interface ResultData {
  overallScore: number;
  sectionScores: SectionScore[];
}

const SupplyChainResults = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { assessments, loading } = useSupplyChainAssessments();
  const [results, setResults] = useState<ResultData | null>(null);
  
  // Get results from location state or fetch from most recent completed assessment
  useEffect(() => {
    if (location.state?.overallScore && location.state?.sectionScores) {
      // Use results from location state (from assessment page)
      setResults({
        overallScore: location.state.overallScore,
        sectionScores: location.state.sectionScores
      });
    } else if (!loading && assessments.length > 0) {
      // Find the most recent completed assessment
      const completedAssessment = assessments.find(a => a.status === 'completed');
      
      if (completedAssessment) {
        setResults({
          overallScore: completedAssessment.overall_score || 0,
          sectionScores: completedAssessment.section_scores as SectionScore[] || []
        });
      } else {
        // If no completed assessment found, use mock data
        setResults(getMockResults());
      }
    } else if (!loading) {
      // If no assessments found, use mock data
      setResults(getMockResults());
    }
  }, [location.state, assessments, loading]);
  
  // Mock results for demo purposes
  const getMockResults = (): ResultData => {
    return {
      overallScore: 62,
      sectionScores: [
        { title: "Supplier Risk Management", percentage: 70, completed: true },
        { title: "Supply Chain Threat Management", percentage: 55, completed: true },
        { title: "Vulnerability Management", percentage: 60, completed: true },
        { title: "Information Sharing", percentage: 75, completed: true },
        { title: "Incident Response", percentage: 50, completed: true },
        { title: "Supplier Lifecycle Management", percentage: 65, completed: true }
      ]
    };
  };

  const handleExport = async () => {
    if (!results) return;
    
    await generateResultsPdf(
      'Supply Chain Risk Assessment Results',
      results.overallScore,
      results.sectionScores,
      new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      'supply-chain-assessment-results.pdf'
    );
  };

  if (loading || !results) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendortal-navy"></div>
      </div>
    );
  }

  // Prepare data for AssessmentResults component
  const resultData = {
    overallScore: results.overallScore,
    sectionScores: results.sectionScores,
    assessmentType: 'supplychain' as const,
    frameworkName: "NIST SP 800-161 Supply Chain Risk Management",
    completedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Supply Chain Risk Assessment Results</h1>
      
      <AssessmentResults 
        data={resultData}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Findings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100/30 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Primary Risk Areas</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {results.sectionScores
                .filter(s => s.percentage < 60)
                .map((section, index) => (
                  <li key={index}>{section.title} ({section.percentage}% compliance)</li>
                ))}
              {results.sectionScores.filter(s => s.percentage < 60).length === 0 && (
                <li>No critical risk areas identified</li>
              )}
            </ul>
          </div>
          
          <div className="p-4 bg-gray-100/30 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {results.sectionScores
                .filter(s => s.percentage >= 70)
                .map((section, index) => (
                  <li key={index}>{section.title} ({section.percentage}% compliance)</li>
                ))}
              {results.sectionScores.filter(s => s.percentage >= 70).length === 0 && (
                <li>No significant strengths identified</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        {assessments.length > 0 && assessments.find(a => a.status === 'completed') && (
          <Link to={`/supply-chain-recommendations/${assessments.find(a => a.status === 'completed')?.id}`}>
        <button
          className="px-4 py-2 bg-vendorsoluce-navy text-white rounded hover:bg-vendorsoluce-navy/90 transition-colors"
        >
          View Detailed Recommendations
        </button>
          </Link>
        )}
        {(!assessments.length || !assessments.find(a => a.status === 'completed')) && (
          <Link to="/supply-chain-recommendations/demo">
            <button
              className="px-4 py-2 bg-vendorsoluce-navy text-white rounded hover:bg-vendorsoluce-navy/90 transition-colors"
            >
              View Detailed Recommendations
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SupplyChainResults;