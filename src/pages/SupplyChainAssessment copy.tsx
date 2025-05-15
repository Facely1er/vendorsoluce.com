import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, CheckCircle, Circle, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SupplyChainAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const sections = [
    {
      title: "Supplier Risk Management",
      description: "Evaluate supplier assessment and risk management practices",
      questions: [
        {
          id: "SR-1",
          question: "Do you have a formal process to assess suppliers before onboarding?",
          control: "NIST SP 800-161 2.2.1",
          guidance: "Implement a supplier risk assessment process before establishing relationships"
        },
        {
          id: "SR-2",
          question: "Are security requirements explicitly included in supplier contracts?",
          control: "NIST SP 800-161 2.2.5",
          guidance: "Define and document security requirements in supplier agreements"
        },
        {
          id: "SR-3",
          question: "Do you maintain a prioritized inventory of critical suppliers?",
          control: "NIST SP 800-161 2.2.2",
          guidance: "Identify and document critical suppliers and supply chain elements"
        },
        {
          id: "SR-4",
          question: "Is supplier access to systems, networks, and data monitored and controlled?",
          control: "NIST SP 800-161 2.2.6",
          guidance: "Implement controls for supplier access to organizational systems"
        }
      ]
    },
    {
      title: "Supply Chain Threat Management",
      description: "Evaluate threat detection and management across the supply chain",
      questions: [
        {
          id: "TM-1",
          question: "Do you have a process to identify and analyze threats specific to the supply chain?",
          control: "NIST SP 800-161 2.3.1",
          guidance: "Implement threat modeling specific to supply chain risks"
        },
        {
          id: "TM-2",
          question: "Is there a process to verify the integrity and provenance of software components?",
          control: "NIST SP 800-161 3.4.1",
          guidance: "Verify the integrity and authenticity of software and components"
        },
        {
          id: "TM-3",
          question: "Are suppliers required to notify you of security incidents that could affect your organization?",
          control: "NIST SP 800-161 2.2.14",
          guidance: "Establish notification requirements for supply chain incidents"
        },
        {
          id: "TM-4",
          question: "Do you validate that critical components and code are free of tampering before use?",
          control: "NIST SP 800-161 3.3.1",
          guidance: "Implement component validation processes before deployment"
        }
      ]
    },
    {
      title: "Vulnerability Management",
      description: "Evaluate vulnerability management processes across the supply chain",
      questions: [
        {
          id: "VM-1",
          question: "Do you have a process to regularly assess vulnerabilities in supply chain components?",
          control: "NIST SP 800-161 3.4.2",
          guidance: "Implement vulnerability scanning for supply chain components"
        },
        {
          id: "VM-2",
          question: "Are vulnerability management responsibilities defined between your organization and suppliers?",
          control: "NIST SP 800-161 2.7.1",
          guidance: "Define and document responsibilities for vulnerability management"
        },
        {
          id: "VM-3",
          question: "Is there a process to verify that suppliers address identified vulnerabilities?",
          control: "NIST SP 800-161 2.7.3",
          guidance: "Implement supplier vulnerability remediation tracking"
        },
        {
          id: "VM-4",
          question: "Do you maintain contingency plans for critical component vulnerabilities?",
          control: "NIST SP 800-161 3.6.2",
          guidance: "Develop contingency plans for addressing critical vulnerabilities"
        }
      ]
    },
    {
      title: "Information Sharing",
      description: "Evaluate information sharing practices with supply chain partners",
      questions: [
        {
          id: "IS-1",
          question: "Do you have formal processes for sharing security information with suppliers?",
          control: "NIST SP 800-161 3.8.1",
          guidance: "Establish secure information sharing practices with suppliers"
        },
        {
          id: "IS-2",
          question: "Are there confidentiality agreements in place for sharing sensitive information?",
          control: "NIST SP 800-161 3.8.3",
          guidance: "Implement confidentiality protections for shared information"
        },
        {
          id: "IS-3",
          question: "Is there a process for suppliers to report potential supply chain risks to your organization?",
          control: "NIST SP 800-161 3.8.5",
          guidance: "Establish channel for suppliers to report potential risks or issues"
        },
        {
          id: "IS-4",
          question: "Do you participate in information sharing communities for supply chain threats?",
          control: "NIST SP 800-161 3.8.6",
          guidance: "Participate in supply chain threat intelligence sharing"
        }
      ]
    },
    {
      title: "Incident Response",
      description: "Evaluate incident response capabilities for supply chain disruptions",
      questions: [
        {
          id: "IR-1",
          question: "Do you have an incident response plan specifically addressing supply chain incidents?",
          control: "NIST SP 800-161 2.8.4",
          guidance: "Develop and maintain supply chain incident response plans"
        },
        {
          id: "IR-2",
          question: "Are roles and responsibilities defined for supply chain incidents?",
          control: "NIST SP 800-161 2.8.5",
          guidance: "Define roles and responsibilities for supply chain incident response"
        },
        {
          id: "IR-3",
          question: "Do you conduct exercises that include supply chain incident scenarios?",
          control: "NIST SP 800-161 2.8.8",
          guidance: "Test incident response capabilities with supply chain scenarios"
        },
        {
          id: "IR-4",
          question: "Are there communication plans for notifying stakeholders of supply chain incidents?",
          control: "NIST SP 800-161 2.8.9",
          guidance: "Establish communication procedures for supply chain incidents"
        }
      ]
    },
    {
      title: "Supplier Lifecycle Management",
      description: "Evaluate supplier management throughout the relationship lifecycle",
      questions: [
        {
          id: "SL-1",
          question: "Do you perform periodic reassessments of existing suppliers?",
          control: "NIST SP 800-161 2.2.16",
          guidance: "Implement a process for regular supplier reassessments"
        },
        {
          id: "SL-2",
          question: "Is there a formal offboarding process for suppliers to prevent security issues?",
          control: "NIST SP 800-161 2.2.17",
          guidance: "Establish secure supplier offboarding procedures"
        },
        {
          id: "SL-3",
          question: "Do you maintain alternate suppliers for critical components or services?",
          control: "NIST SP 800-161 2.6.3",
          guidance: "Identify and maintain alternate supply chain paths for critical elements"
        },
        {
          id: "SL-4",
          question: "Are there transition plans for critical supplier changes?",
          control: "NIST SP 800-161 2.6.4",
          guidance: "Develop transition plans for critical supplier changes"
        }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateSectionScore = (sectionIndex: number) => {
    const sectionQuestions = sections[sectionIndex].questions;
    let score = 0;
    let answered = 0;

    sectionQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer === 'yes') {
        score += 2;
        answered++;
      } else if (answer === 'partial') {
        score += 1;
        answered++;
      } else if (answer === 'no') {
        answered++;
      }
    });

    return {
      score,
      total: sectionQuestions.length * 2,
      completed: answered === sectionQuestions.length,
      percentage: Math.round((score / (sectionQuestions.length * 2)) * 100)
    };
  };

  const getOverallScore = () => {
    let totalScore = 0;
    let totalPossible = 0;

    sections.forEach((_, index) => {
      const sectionScore = calculateSectionScore(index);
      totalScore += sectionScore.score;
      totalPossible += sectionScore.total;
    });

    return Math.round((totalScore / totalPossible) * 100);
  };

  const renderAnswerButtons = (questionId: string) => {
    const currentAnswer = answers[questionId];
    
    return (
      <div className="flex gap-2 mt-2">
        <Button
          variant={currentAnswer === 'yes' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'yes')}
          className="flex items-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Yes
        </Button>
        <Button
          variant={currentAnswer === 'partial' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'partial')}
          className="flex items-center gap-1"
        >
          <Circle className="w-4 h-4" />
          Partial
        </Button>
        <Button
          variant={currentAnswer === 'no' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'no')}
          className="flex items-center gap-1"
        >
          <AlertTriangle className="w-4 h-4" />
          No
        </Button>
      </div>
    );
  };

  // Determine if we have enough answers to show results
  const hasCompletedMinimumSections = () => {
    let completedSections = 0;
    sections.forEach((_, index) => {
      if (calculateSectionScore(index).completed) {
        completedSections++;
      }
    });
    return completedSections >= Math.ceil(sections.length / 2);
  };

  const handleViewResults = () => {
    // In a real application, you would save the assessment results
    // before navigating to the results page
    navigate('/supply-chain-results');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Supply Chain Risk Assessment</h1>
        <p className="text-muted-foreground mb-6">Based on NIST SP 800-161 Supply Chain Risk Management Practices</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {sections.map((section, index) => {
          const score = calculateSectionScore(index);
          return (
            <Card key={index} className="p-4 border dark:border-muted">
              <h3 className="font-semibold mb-2 text-foreground">{section.title}</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Score: {score.percentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    {score.completed ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
                <Button
                  variant={currentSection === index ? 'default' : 'outline'}
                  onClick={() => setCurrentSection(index)}
                  size="sm"
                >
                  {currentSection === index ? 'Current' : 'View'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border dark:border-muted">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{sections[currentSection].title}</h2>
            <p className="text-muted-foreground">{sections[currentSection].description}</p>
          </div>
          <div className="text-xl font-semibold text-foreground">
            Overall Score: {getOverallScore()}%
          </div>
        </div>

        <div className="space-y-6">
          {sections[currentSection].questions.map((question) => (
            <div key={question.id} className="border-b border-border pb-4 last:border-b-0">
              <div className="flex items-start gap-2 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                  {question.id}
                </div>
                <p className="font-medium text-foreground flex-1">{question.question}</p>
              </div>
              
              <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded mb-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{question.control}</p>
                    <p className="text-sm text-muted-foreground">{question.guidance}</p>
                  </div>
                </div>
              </div>
              
              {renderAnswerButtons(question.id)}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
          >
            Previous Section
          </Button>
          
          {currentSection < sections.length - 1 ? (
            <Button
              onClick={() => setCurrentSection(prev => prev + 1)}
            >
              Next Section
            </Button>
          ) : (
            <Button
              onClick={handleViewResults}
              disabled={!hasCompletedMinimumSections()}
              className="flex items-center gap-2"
            >
              View Results
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SupplyChainAssessment;