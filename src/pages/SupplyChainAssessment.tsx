import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, CheckCircle, Circle, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SupplyChainAssessment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

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

  const handleViewResults = () => {
    // In a real application, you would save the assessment results
    // before navigating to the results page
    navigate('/supply-chain-results');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-vendortal-navy dark:hover:text-trust-blue transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('assessment.backToHome')}
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('assessment.title')}</h1>
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
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
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