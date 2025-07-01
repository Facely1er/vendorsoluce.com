import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, CheckCircle, Circle, Info, ArrowLeft, ArrowRight, Clipboard, FileText, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSupplyChainAssessments } from '../hooks/useSupplyChainAssessments';
import { useAuth } from '../context/AuthContext';

const SupplyChainAssessment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentAssessment, createOrUpdateAssessment, loading } = useSupplyChainAssessments();
  
  // Assessment stage state ('startScreen', 'onboarding', 'assessment')
  const [assessmentStage, setAssessmentStage] = useState<'startScreen' | 'onboarding' | 'assessment'>('startScreen');
  const [assessmentName, setAssessmentName] = useState<string>('Supply Chain Risk Assessment');
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load saved answers if available
  useEffect(() => {
    if (loading) return;
    
    if (currentAssessment?.answers) {
      // If there's an existing assessment in progress, go directly to assessment
      setAnswers(currentAssessment.answers as Record<string, string>);
      setAssessmentName(currentAssessment.assessment_name || 'Supply Chain Risk Assessment');
      setAssessmentStage('assessment');
    }
  }, [currentAssessment, loading]);

  const sections = [
    {
      title: t('supplyChain.sections.supplier.title'),
      description: t('supplyChain.sections.supplier.description'),
      questions: [
        {
          id: "SR-1",
          question: t('supplyChain.sections.supplier.questions.sr1.question'),
          control: "NIST SP 800-161 2.2.1",
          guidance: t('supplyChain.sections.supplier.questions.sr1.guidance')
        },
        {
          id: "SR-2",
          question: t('supplyChain.sections.supplier.questions.sr2.question'),
          control: "NIST SP 800-161 2.2.5",
          guidance: t('supplyChain.sections.supplier.questions.sr2.guidance')
        },
        {
          id: "SR-3",
          question: t('supplyChain.sections.supplier.questions.sr3.question'),
          control: "NIST SP 800-161 2.2.2",
          guidance: t('supplyChain.sections.supplier.questions.sr3.guidance')
        },
        {
          id: "SR-4",
          question: t('supplyChain.sections.supplier.questions.sr4.question'),
          control: "NIST SP 800-161 2.2.6",
          guidance: t('supplyChain.sections.supplier.questions.sr4.guidance')
        }
      ]
    },
    {
      title: t('supplyChain.sections.threat.title'),
      description: t('supplyChain.sections.threat.description'),
      questions: [
        {
          id: "TM-1",
          question: t('supplyChain.sections.threat.questions.tm1.question'),
          control: "NIST SP 800-161 2.3.1",
          guidance: t('supplyChain.sections.threat.questions.tm1.guidance')
        },
        {
          id: "TM-2",
          question: t('supplyChain.sections.threat.questions.tm2.question'),
          control: "NIST SP 800-161 3.4.1",
          guidance: t('supplyChain.sections.threat.questions.tm2.guidance')
        },
        {
          id: "TM-3",
          question: t('supplyChain.sections.threat.questions.tm3.question'),
          control: "NIST SP 800-161 2.2.14",
          guidance: t('supplyChain.sections.threat.questions.tm3.guidance')
        },
        {
          id: "TM-4",
          question: t('supplyChain.sections.threat.questions.tm4.question'),
          control: "NIST SP 800-161 3.3.1",
          guidance: t('supplyChain.sections.threat.questions.tm4.guidance')
        }
      ]
    },
    {
      title: t('supplyChain.sections.vulnerability.title'),
      description: t('supplyChain.sections.vulnerability.description'),
      questions: [
        {
          id: "VM-1",
          question: t('supplyChain.sections.vulnerability.questions.vm1.question'),
          control: "NIST SP 800-161 3.4.2",
          guidance: t('supplyChain.sections.vulnerability.questions.vm1.guidance')
        },
        {
          id: "VM-2",
          question: t('supplyChain.sections.vulnerability.questions.vm2.question'),
          control: "NIST SP 800-161 2.7.1",
          guidance: t('supplyChain.sections.vulnerability.questions.vm2.guidance')
        },
        {
          id: "VM-3",
          question: t('supplyChain.sections.vulnerability.questions.vm3.question'),
          control: "NIST SP 800-161 2.7.3",
          guidance: t('supplyChain.sections.vulnerability.questions.vm3.guidance')
        },
        {
          id: "VM-4",
          question: t('supplyChain.sections.vulnerability.questions.vm4.question'),
          control: "NIST SP 800-161 3.6.2",
          guidance: t('supplyChain.sections.vulnerability.questions.vm4.guidance')
        }
      ]
    },
    {
      title: t('supplyChain.sections.information.title'),
      description: t('supplyChain.sections.information.description'),
      questions: [
        {
          id: "IS-1",
          question: t('supplyChain.sections.information.questions.is1.question'),
          control: "NIST SP 800-161 3.8.1",
          guidance: t('supplyChain.sections.information.questions.is1.guidance')
        },
        {
          id: "IS-2",
          question: t('supplyChain.sections.information.questions.is2.question'),
          control: "NIST SP 800-161 3.8.3",
          guidance: t('supplyChain.sections.information.questions.is2.guidance')
        },
        {
          id: "IS-3",
          question: t('supplyChain.sections.information.questions.is3.question'),
          control: "NIST SP 800-161 3.8.5",
          guidance: t('supplyChain.sections.information.questions.is3.guidance')
        },
        {
          id: "IS-4",
          question: t('supplyChain.sections.information.questions.is4.question'),
          control: "NIST SP 800-161 3.8.6",
          guidance: t('supplyChain.sections.information.questions.is4.guidance')
        }
      ]
    },
    {
      title: t('supplyChain.sections.incident.title'),
      description: t('supplyChain.sections.incident.description'),
      questions: [
        {
          id: "IR-1",
          question: t('supplyChain.sections.incident.questions.ir1.question'),
          control: "NIST SP 800-161 2.8.4",
          guidance: t('supplyChain.sections.incident.questions.ir1.guidance')
        },
        {
          id: "IR-2",
          question: t('supplyChain.sections.incident.questions.ir2.question'),
          control: "NIST SP 800-161 2.8.5",
          guidance: t('supplyChain.sections.incident.questions.ir2.guidance')
        },
        {
          id: "IR-3",
          question: t('supplyChain.sections.incident.questions.ir3.question'),
          control: "NIST SP 800-161 2.8.8",
          guidance: t('supplyChain.sections.incident.questions.ir3.guidance')
        },
        {
          id: "IR-4",
          question: t('supplyChain.sections.incident.questions.ir4.question'),
          control: "NIST SP 800-161 2.8.9",
          guidance: t('supplyChain.sections.incident.questions.ir4.guidance')
        }
      ]
    },
    {
      title: t('supplyChain.sections.lifecycle.title'),
      description: t('supplyChain.sections.lifecycle.description'),
      questions: [
        {
          id: "SL-1",
          question: t('supplyChain.sections.lifecycle.questions.sl1.question'),
          control: "NIST SP 800-161 2.2.16",
          guidance: t('supplyChain.sections.lifecycle.questions.sl1.guidance')
        },
        {
          id: "SL-2",
          question: t('supplyChain.sections.lifecycle.questions.sl2.question'),
          control: "NIST SP 800-161 2.2.17",
          guidance: t('supplyChain.sections.lifecycle.questions.sl2.guidance')
        },
        {
          id: "SL-3",
          question: t('supplyChain.sections.lifecycle.questions.sl3.question'),
          control: "NIST SP 800-161 2.6.3",
          guidance: t('supplyChain.sections.lifecycle.questions.sl3.guidance')
        },
        {
          id: "SL-4",
          question: t('supplyChain.sections.lifecycle.questions.sl4.question'),
          control: "NIST SP 800-161 2.6.4",
          guidance: t('supplyChain.sections.lifecycle.questions.sl4.guidance')
        }
      ]
    }
  ];

  const handleAnswer = async (questionId: string, answer: string) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    
    setAnswers(newAnswers);
    
    // Save to database if user is authenticated
    if (isAuthenticated) {
      try {
        setSaveStatus('saving');
        await createOrUpdateAssessment({
          assessment_name: assessmentName
        }, newAnswers);
        setSaveStatus('saved');
        
        // Reset save status after a delay
        setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
      } catch (err) {
        console.error('Error saving assessment:', err);
        setSaveStatus('error');
      }
    }
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
          variant={currentAnswer === 'yes' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'yes')}
          className="flex items-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          {t('components.yes')}
        </Button>
        <Button
          variant={currentAnswer === 'partial' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'partial')}
          className="flex items-center gap-1"
        >
          <Circle className="w-4 h-4" />
          {t('components.partial')}
        </Button>
        <Button
          variant={currentAnswer === 'no' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'no')}
          className="flex items-center gap-1"
        >
          <AlertTriangle className="w-4 h-4" />
          {t('components.no')}
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

  const handleStartAssessment = () => {
    setAssessmentStage('onboarding');
  };

  const handleContinueToAssessment = async () => {
    // Save assessment name and initialize assessment
    if (isAuthenticated) {
      try {
        setSaveStatus('saving');
        await createOrUpdateAssessment({
          assessment_name: assessmentName,
          status: 'in_progress'
        }, answers);
        setSaveStatus('saved');
      } catch (err) {
        console.error('Error initializing assessment:', err);
        setSaveStatus('error');
      }
    }
    
    setAssessmentStage('assessment');
  };

  const handleViewResults = async () => {
    if (isAuthenticated) {
      // Calculate section scores
      const sectionScores = sections.map((section, index) => {
        const score = calculateSectionScore(index);
        return {
          title: section.title,
          percentage: score.percentage,
          completed: score.completed
        };
      });
      
      // Save assessment as completed
      try {
        await createOrUpdateAssessment({
          assessment_name: assessmentName,
          overall_score: getOverallScore(),
          section_scores: sectionScores,
          status: 'completed',
          completed_at: new Date().toISOString()
        }, answers);
      } catch (err) {
        console.error('Error completing assessment:', err);
      }
    }
    
    // Navigate to results page
    navigate('/supply-chain-results', { 
      state: { 
        overallScore: getOverallScore(),
        sectionScores: sections.map((section, index) => {
          const score = calculateSectionScore(index);
          return {
            title: section.title,
            percentage: score.percentage,
            completed: score.completed
          };
        })
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vendortal-navy"></div>
      </div>
    );
  }

  // Start Screen Component
  const StartScreen = () => (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('assessment.backToHome')}
        </Link>
      </div>

      <Card className="border-vendortal-navy dark:border-trust-blue border-l-4">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto w-16 h-16 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-vendortal-navy dark:text-trust-blue" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('assessment.title')}
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            {t('assessment.subtitle')}
          </p>
        </CardHeader>

        <CardContent className="pt-8 pb-8 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">NIST Aligned</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Assessment based on NIST SP 800-161 Supply Chain Risk Management framework
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-3">
                <Clipboard className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Comprehensive</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                24 questions across 6 key supply chain security domains
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-vendortal-navy/10 dark:bg-vendortal-navy/30 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-vendortal-navy dark:text-trust-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Actionable</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get personalized recommendations and a detailed compliance report
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-8">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                  This assessment will help you evaluate your organization's supply chain security posture against NIST SP 800-161 guidelines. You'll receive a detailed score and actionable recommendations to improve your security posture.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={handleStartAssessment}
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Onboarding Component
  const OnboardingScreen = () => (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <button 
          onClick={() => setAssessmentStage('startScreen')}
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            Name Your Assessment
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Give your assessment a descriptive name to help you identify it later. This name will appear in your assessment list and reports.
          </p>

          <div className="mb-6">
            <label htmlFor="assessmentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assessment Name
            </label>
            <input
              type="text"
              id="assessmentName"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-vendortal-navy focus:border-vendortal-navy bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="e.g., Q3 2025 Supply Chain Assessment"
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">What to expect:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>24 questions across 6 supply chain security domains</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Approximately 15-20 minutes to complete</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Your progress is automatically saved</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Detailed results and recommendations</span>
              </li>
            </ul>
          </div>

          <Button 
            variant="primary"
            className="w-full"
            onClick={handleContinueToAssessment}
          >
            Continue to Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Render the appropriate screen based on assessmentStage
  if (assessmentStage === 'startScreen') {
    return <StartScreen />;
  }

  if (assessmentStage === 'onboarding') {
    return <OnboardingScreen />;
  }

  // The main assessment UI (original code with minor adjustments)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('assessment.backToHome')}
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{assessmentName}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t('assessment.subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {sections.map((section, index) => {
          const score = calculateSectionScore(index);
          return (
            <Card key={index} className="p-4">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{section.title}</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('assessment.score')}: {score.percentage}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {score.completed ? t('assessment.complete') : t('assessment.incomplete')}
                  </p>
                </div>
                <Button
                  variant={currentSection === index ? 'primary' : 'outline'}
                  onClick={() => setCurrentSection(index)}
                  size="sm"
                >
                  {currentSection === index ? t('assessment.current') : t('assessment.view')}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{sections[currentSection].title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{sections[currentSection].description}</p>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            {saveStatus === 'saving' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vendortal-navy mr-2"></div>
            )}
            {saveStatus === 'saved' && (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            )}
            {saveStatus === 'error' && (
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
            )}
            {t('assessment.overallScore')}: {getOverallScore()}%
          </div>
        </div>

        <div className="space-y-6">
          {sections[currentSection].questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <div className="flex items-start gap-2 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 font-medium px-2 py-1 rounded text-sm font-mono">
                  {question.id}
                </div>
                <p className="font-medium text-gray-900 dark:text-white flex-1">{question.question}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded mb-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{question.control}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{question.guidance}</p>
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
            {t('assessment.previousSection')}
          </Button>
          
          {currentSection < sections.length - 1 ? (
            <Button
              variant="primary"
              onClick={() => setCurrentSection(prev => prev + 1)}
            >
              {t('assessment.nextSection')}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleViewResults}
              disabled={!hasCompletedMinimumSections()}
              className="flex items-center gap-2"
            >
              {t('assessment.viewResults')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SupplyChainAssessment;