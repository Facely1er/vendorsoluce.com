import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Recommendations from '../components/assessments/Recommendations';
import { generateRecommendationsPdf } from '../utils/generatePdf';
import { useSupplyChainAssessments } from '../hooks/useSupplyChainAssessments';

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  effort: 'minimal' | 'moderate' | 'significant';
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  impact: string;
  steps: string[];
  references: {
    title: string;
    url: string;
  }[];
}

const SupplyChainRecommendations = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assessments, loading } = useSupplyChainAssessments();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  
  // Build recommendations from translation keys
  const buildRecommendationsFromTranslations = (): RecommendationItem[] => {
    const recommendationIds = ['sc1', 'sc2', 'sc3', 'sc4', 'sc5', 'sc6', 'sc7', 'sc8'];
    
    return recommendationIds.map(id => ({
      id,
      title: t(`recommendations.items.${id}.title`),
      description: t(`recommendations.items.${id}.description`),
      priority: id === 'sc1' || id === 'sc5' ? 'critical' : 
                id === 'sc2' || id === 'sc3' || id === 'sc4' ? 'high' : 
                id === 'sc6' || id === 'sc7' ? 'medium' : 'low',
      category: id === 'sc1' ? t('recommendations.categories.supplierRiskManagement') :
                id === 'sc2' ? t('recommendations.categories.incidentResponse') :
                id === 'sc3' ? t('recommendations.categories.vulnerabilityManagement') :
                id === 'sc4' ? t('recommendations.categories.governance') :
                id === 'sc5' ? t('recommendations.categories.accessControl') :
                id === 'sc6' ? t('recommendations.categories.businessContinuity') :
                id === 'sc7' ? t('recommendations.categories.informationSharing') :
                t('recommendations.categories.softwareSecurity'),
      effort: id === 'sc2' || id === 'sc5' ? 'significant' : 'moderate',
      timeframe: id === 'sc5' ? 'immediate' : 
                 id === 'sc1' || id === 'sc2' || id === 'sc3' ? 'short-term' : 
                 'medium-term',
      impact: t(`recommendations.items.${id}.impact`),
      steps: t(`recommendations.items.${id}.steps`, { returnObjects: true }) as string[],
      references: getReferencesForRecommendation(id)
    }));
  };

  // Get references for each recommendation
  const getReferencesForRecommendation = (id: string) => {
    const baseUrls = {
      nist161: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final",
      iso28001: "https://www.iso.org/standard/45654.html",
      nist161AppendixC: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final",
      cisaSupplyChain: "https://www.cisa.gov/cyber-supply-chain-risk-management",
      nist218: "https://csrc.nist.gov/publications/detail/sp/800-218/final",
      ntiaSbom: "https://www.ntia.gov/sbom",
      nist8276: "https://csrc.nist.gov/publications/detail/nistir/8276/final",
      csaCAI: "https://cloudsecurityalliance.org/research/guidance/",
      nist207: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
      nsaCisaRemote: "https://www.cisa.gov/publication/securing-remote-access-software",
      nist34: "https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final",
      iso22301: "https://www.iso.org/standard/75106.html",
      nist150: "https://csrc.nist.gov/publications/detail/sp/800-150/final",
      cisaInfoSharing: "https://www.cisa.gov/information-sharing-and-awareness",
      slsaFramework: "https://slsa.dev/"
    };

    switch (id) {
      case 'sc1':
        return [
          { title: t('recommendations.references.nist161'), url: baseUrls.nist161 },
          { title: t('recommendations.references.iso28001'), url: baseUrls.iso28001 }
        ];
      case 'sc2':
        return [
          { title: t('recommendations.references.nist161AppendixC'), url: baseUrls.nist161AppendixC },
          { title: t('recommendations.references.cisaSupplyChain'), url: baseUrls.cisaSupplyChain }
        ];
      case 'sc3':
        return [
          { title: t('recommendations.references.nist218'), url: baseUrls.nist218 },
          { title: t('recommendations.references.ntiaSbom'), url: baseUrls.ntiaSbom }
        ];
      case 'sc4':
        return [
          { title: t('recommendations.references.nist8276'), url: baseUrls.nist8276 },
          { title: t('recommendations.references.csaCAI'), url: baseUrls.csaCAI }
        ];
      case 'sc5':
        return [
          { title: t('recommendations.references.nist207'), url: baseUrls.nist207 },
          { title: t('recommendations.references.nsaCisaRemote'), url: baseUrls.nsaCisaRemote }
        ];
      case 'sc6':
        return [
          { title: t('recommendations.references.nist34'), url: baseUrls.nist34 },
          { title: t('recommendations.references.iso22301'), url: baseUrls.iso22301 }
        ];
      case 'sc7':
        return [
          { title: t('recommendations.references.nist150'), url: baseUrls.nist150 },
          { title: t('recommendations.references.cisaInfoSharing'), url: baseUrls.cisaInfoSharing }
        ];
      case 'sc8':
        return [
          { title: t('recommendations.references.nist218'), url: baseUrls.nist218 },
          { title: t('recommendations.references.slsaFramework'), url: baseUrls.slsaFramework }
        ];
      default:
        return [];
    }
  };
  
  // Generate recommendations based on assessment results
  useEffect(() => {
    if (!loading && assessments.length > 0) {
      // Find the most recent completed assessment
      const completedAssessment = assessments.find(a => a.status === 'completed');
      
      if (completedAssessment && completedAssessment.section_scores) {
        // Generate recommendations based on section scores
        const sectionScores = completedAssessment.section_scores as any[];
        const generatedRecommendations = generateRecommendations(sectionScores);
        setRecommendations(generatedRecommendations);
      } else {
        // If no completed assessment found, use translated recommendations
        const translatedRecommendations = buildRecommendationsFromTranslations();
        setRecommendations(translatedRecommendations);
      }
    } else if (!loading) {
      // If no assessments found, use translated recommendations
      const translatedRecommendations = buildRecommendationsFromTranslations();
      setRecommendations(translatedRecommendations);
    }
  }, [assessments, loading, t]);

  // Generate recommendations based on section scores
  const generateRecommendations = (sectionScores: any[]): RecommendationItem[] => {
    const allRecommendations = buildRecommendationsFromTranslations();
    const generatedRecommendations: RecommendationItem[] = [];
    
    // Find low-scoring sections and add relevant recommendations
    sectionScores.forEach(section => {
      if (section.percentage < 60) {
        // Add recommendations based on section title
        if (section.title.includes('Supplier') || section.title.includes('Fournisseur')) {
          const recommendation = allRecommendations.find(r => r.id === 'sc1');
          if (recommendation) {
            generatedRecommendations.push({
              ...recommendation,
              priority: section.percentage < 40 ? 'critical' : 'high'
            });
          }
        }
        
        if (section.title.includes('Incident') || section.title.includes('Réponse')) {
          const recommendation = allRecommendations.find(r => r.id === 'sc2');
          if (recommendation) {
            generatedRecommendations.push({
              ...recommendation,
              priority: section.percentage < 40 ? 'critical' : 'high'
            });
          }
        }
        
        if (section.title.includes('Vulnerability') || section.title.includes('Vulnérabilité')) {
          const recommendation = allRecommendations.find(r => r.id === 'sc3');
          if (recommendation) {
            generatedRecommendations.push({
              ...recommendation,
              priority: section.percentage < 40 ? 'critical' : 'high'
            });
          }
        }
      }
    });
    
    // If no specific recommendations were added, use all translated recommendations
    if (generatedRecommendations.length === 0) {
      return allRecommendations;
    }
    
    // Add some medium/low priority recommendations to round out the list
    const remainingRecommendations = allRecommendations.filter(rec => 
      !generatedRecommendations.some(genRec => genRec.id === rec.id)
    );
    
    // Add up to 5 more recommendations
    const additionalCount = Math.min(5, remainingRecommendations.length);
    for (let i = 0; i < additionalCount; i++) {
      generatedRecommendations.push(remainingRecommendations[i]);
    }
    
    return generatedRecommendations;
  };

  const handleExport = async () => {
    const filename = t('recommendations.supplyChain.exportFilename');
    await generateRecommendationsPdf(
      t('recommendations.supplyChain.title'),
      recommendations,
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      filename
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendortal-navy"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Recommendations
        title={t('recommendations.supplyChain.title')}
        subtitle={t('recommendations.supplyChain.subtitle')}
        assessmentType="supplychain"
        recommendations={recommendations}
        onBack={() => navigate('/supply-chain-results')}
        onExport={handleExport}
      />
    </div>
  );
};

export default SupplyChainRecommendations;