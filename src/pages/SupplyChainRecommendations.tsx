import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { assessments, loading } = useSupplyChainAssessments();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  
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
        // If no completed assessment found, use mock recommendations
        setRecommendations(mockRecommendations);
      }
    } else if (!loading) {
      // If no assessments found, use mock recommendations
      setRecommendations(mockRecommendations);
    }
  }, [assessments, loading]);

  // Generate recommendations based on section scores
  const generateRecommendations = (sectionScores: any[]): RecommendationItem[] => {
    const generatedRecommendations: RecommendationItem[] = [];
    
    // Find low-scoring sections and add relevant recommendations
    sectionScores.forEach(section => {
      if (section.percentage < 60) {
        // Add recommendations based on section title
        if (section.title.includes('Supplier Risk')) {
          generatedRecommendations.push({
            ...mockRecommendations[0], // Use Supplier Risk Tiering recommendation
            priority: section.percentage < 40 ? 'critical' : 'high'
          });
        }
        
        if (section.title.includes('Incident Response')) {
          generatedRecommendations.push({
            ...mockRecommendations[1], // Use Incident Response recommendation
            priority: section.percentage < 40 ? 'critical' : 'high'
          });
        }
        
        if (section.title.includes('Vulnerability')) {
          generatedRecommendations.push({
            ...mockRecommendations[2], // Use Vulnerability Management recommendation
            priority: section.percentage < 40 ? 'critical' : 'high'
          });
        }
      }
    });
    
    // If no specific recommendations were added, use the mock ones
    if (generatedRecommendations.length === 0) {
      return mockRecommendations;
    }
    
    // Add some medium/low priority recommendations to round out the list
    const remainingRecommendations = mockRecommendations.filter(rec => 
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
    await generateRecommendationsPdf(
      'Supply Chain Risk Management Recommendations',
      recommendations,
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      'supply-chain-recommendations.pdf'
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
        title="Supply Chain Risk Management Recommendations"
        subtitle="Based on NIST SP 800-161 Supply Chain Risk Management Practices"
        assessmentType="supplychain"
        recommendations={recommendations}
        onBack={() => navigate('/supply-chain-results')}
        onExport={handleExport}
      />
    </div>
  );
};

// Mock recommendations data
const mockRecommendations: RecommendationItem[] = [
  {
    id: "sc1",
    title: "Implement Supplier Risk Tiering System",
    description: "Develop a formal risk-based tiering system for suppliers to prioritize assessment and monitoring activities based on criticality and access to sensitive data or systems.",
    priority: "critical",
    category: "Supplier Risk Management",
    effort: "moderate",
    timeframe: "short-term",
    impact: "A structured supplier tiering system enables efficient allocation of resources to the most critical supplier relationships and helps focus security requirements proportional to risk.",
    steps: [
      "Define criteria for supplier categorization (e.g., access to sensitive data, operational importance, ease of replacement)",
      "Develop a scoring methodology to determine supplier tier assignment",
      "Classify all existing suppliers according to the new system",
      "Document differentiated security requirements for each tier",
      "Implement tier-specific assessment and monitoring processes"
    ],
    references: [
      {
        title: "NIST SP 800-161r1 - Supply Chain Risk Management Practices",
        url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final"
      },
      {
        title: "ISO 28001:2007 Security management systems for the supply chain",
        url: "https://www.iso.org/standard/45654.html"
      }
    ]
  },
  {
    id: "sc2",
    title: "Establish Supply Chain Incident Response Procedures",
    description: "Develop specific incident response procedures for supply chain security incidents, including third-party breaches, compromised software components, and hardware tampering.",
    priority: "high",
    category: "Incident Response",
    effort: "significant",
    timeframe: "short-term",
    impact: "Dedicated supply chain incident procedures reduce response time and improve coordination during incidents that involve suppliers or third parties.",
    steps: [
      "Identify supply chain incident scenarios specific to your organization",
      "Define roles and responsibilities for supply chain incident response",
      "Establish communication protocols with key suppliers",
      "Create playbooks for common supply chain incident types",
      "Conduct tabletop exercises to test procedures",
      "Document recovery and continuity procedures for critical supplier disruptions"
    ],
    references: [
      {
        title: "NIST SP 800-161r1 - Appendix C: Supply Chain Threat Scenarios",
        url: "https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final"
      },
      {
        title: "CISA Cyber Supply Chain Risk Management",
        url: "https://www.cisa.gov/cyber-supply-chain-risk-management"
      }
    ]
  },
  {
    id: "sc3",
    title: "Implement Software Component Analysis",
    description: "Deploy automated tools to inventory and analyze software dependencies, libraries, and components used in applications to identify potential security vulnerabilities in the software supply chain.",
    priority: "high",
    category: "Vulnerability Management",
    effort: "moderate",
    timeframe: "short-term",
    impact: "Software component analysis enables early identification of vulnerable dependencies and reduces the risk of supply chain compromises through third-party code.",
    steps: [
      "Select and implement a software composition analysis (SCA) tool",
      "Integrate SCA into development and build pipelines",
      "Generate a software bill of materials (SBOM) for all applications",
      "Establish a process to review and remediate identified vulnerabilities",
      "Document acceptable risk thresholds for different component types",
      "Implement continuous monitoring for newly discovered vulnerabilities"
    ],
    references: [
      {
        title: "NIST SP 800-218 - Secure Software Development Framework",
        url: "https://csrc.nist.gov/publications/detail/sp/800-218/final"
      },
      {
        title: "NTIA Software Bill of Materials",
        url: "https://www.ntia.gov/sbom"
      }
    ]
  },
  {
    id: "sc4",
    title: "Implement Vendor Security Requirements in Contracts",
    description: "Develop standardized security language for supplier contracts that clearly defines security requirements, assessment rights, incident notification, and compliance expectations.",
    priority: "high",
    category: "Governance",
    effort: "moderate",
    timeframe: "medium-term",
    impact: "Contractual security requirements establish clear expectations and provide leverage to enforce security practices across the supply chain.",
    steps: [
      "Work with legal and procurement teams to develop standard security clauses",
      "Define tiered security requirements based on supplier criticality",
      "Include requirements for incident notification, right-to-audit, and vulnerability disclosure",
      "Establish consequences for non-compliance with security requirements",
      "Implement a review process for security terms in all new contracts",
      "Develop a roadmap for updating existing contracts"
    ],
    references: [
      {
        title: "NIST IR 8276 - Key Practices in Cyber Supply Chain Risk Management",
        url: "https://csrc.nist.gov/publications/detail/nistir/8276/final"
      },
      {
        title: "Cloud Security Alliance - Consensus Assessments Initiative Questionnaire",
        url: "https://cloudsecurityalliance.org/research/guidance/"
      }
    ]
  },
  {
    id: "sc5",
    title: "Create Secure Supplier Remote Access Controls",
    description: "Implement enhanced security controls for supplier remote access to internal systems, including dedicated access pathways, MFA, and granular monitoring.",
    priority: "critical",
    category: "Access Control",
    effort: "significant",
    timeframe: "immediate",
    impact: "Secured supplier access reduces the risk of unauthorized access through trusted third-party connections, a common attack vector in supply chain compromises.",
    steps: [
      "Inventory all supplier remote access connections",
      "Implement dedicated access methods (e.g., VPNs, secure gateways) for supplier connections",
      "Require MFA for all supplier remote access",
      "Implement just-in-time and just-enough access principles",
      "Deploy enhanced monitoring and logging for supplier activities",
      "Establish regular access review processes for supplier accounts"
    ],
    references: [
      {
        title: "NIST SP 800-207 - Zero Trust Architecture",
        url: "https://csrc.nist.gov/publications/detail/sp/800-207/final"
      },
      {
        title: "NSA/CISA Guidance for Securing Remote Access",
        url: "https://www.cisa.gov/publication/securing-remote-access-software"
      }
    ]
  },
  {
    id: "sc6",
    title: "Develop Supplier Contingency Plans",
    description: "Create contingency plans for critical supplier disruptions, including identification of alternate suppliers, service continuity procedures, and emergency response actions.",
    priority: "medium",
    category: "Business Continuity",
    effort: "moderate",
    timeframe: "medium-term",
    impact: "Supplier contingency planning improves organizational resilience and reduces the impact of supply chain disruptions.",
    steps: [
      "Identify single points of failure in the supply chain",
      "Qualify alternate suppliers for critical components",
      "Develop continuity procedures for supplier disruptions",
      "Create emergency acquisition procedures",
      "Establish inventory management strategies for critical components",
      "Test contingency plans through tabletop exercises"
    ],
    references: [
      {
        title: "NIST SP 800-34r1 - Contingency Planning Guide",
        url: "https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final"
      },
      {
        title: "ISO 22301 - Business Continuity Management",
        url: "https://www.iso.org/standard/75106.html"
      }
    ]
  },
  {
    id: "sc7",
    title: "Establish Threat Intelligence Sharing with Suppliers",
    description: "Create a framework for sharing relevant threat intelligence with key suppliers and receiving intelligence about supply chain threats from partners.",
    priority: "medium",
    category: "Information Sharing",
    effort: "moderate",
    timeframe: "medium-term",
    impact: "Collaborative threat intelligence sharing improves detection and prevention capabilities across the supply chain ecosystem.",
    steps: [
      "Identify the types of threat intelligence relevant to share with suppliers",
      "Establish secure channels for intelligence exchange",
      "Develop information sharing agreements with key suppliers",
      "Implement automated threat intelligence sharing where possible",
      "Join relevant information sharing communities like ISACs",
      "Create processes to act on received intelligence"
    ],
    references: [
      {
        title: "NIST SP 800-150 - Guide to Cyber Threat Information Sharing",
        url: "https://csrc.nist.gov/publications/detail/sp/800-150/final"
      },
      {
        title: "CISA Information Sharing and Awareness",
        url: "https://www.cisa.gov/information-sharing-and-awareness"
      }
    ]
  },
  {
    id: "sc8",
    title: "Implement Secure Software Delivery Verification",
    description: "Establish processes to verify the integrity and authenticity of software delivered through the supply chain using code signing, checksum verification, and secure delivery methods.",
    priority: "low",
    category: "Software Security",
    effort: "moderate",
    timeframe: "medium-term",
    impact: "Software verification reduces the risk of compromised or tampered code entering the environment through trusted supply chain channels.",
    steps: [
      "Require suppliers to implement code signing for all software deliverables",
      "Establish secure hash verification procedures",
      "Document secure software delivery and verification processes",
      "Train relevant staff on verification procedures",
      "Implement automated verification where possible",
      "Establish incident procedures for failed verifications"
    ],
    references: [
      {
        title: "NIST SP 800-218 - Secure Software Development Framework",
        url: "https://csrc.nist.gov/publications/detail/sp/800-218/final"
      },
      {
        title: "SLSA Framework for Supply Chain Integrity",
        url: "https://slsa.dev/"
      }
    ]
  }
];

export default SupplyChainRecommendations;