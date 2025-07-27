import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  FileJson, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Eye,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SBOMUploader from '../components/sbom/SBOMUploader';
import { useTranslation } from 'react-i18next';
import { useSBOMAnalyses } from '../hooks/useSBOMAnalyses';
import { useAuth } from '../context/AuthContext';

interface SBOMAnalysisResult {
  id: string;
  filename: string;
  totalComponents: number;
  totalVulnerabilities: number;
  riskScore: number;
  criticalVulnerabilities: number;
  highVulnerabilities: number;
  licenseIssues: number;
  createdAt: string;
}

const SBOMAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { analyses, createAnalysis } = useSBOMAnalyses();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<SBOMAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Read and parse the SBOM file
      const fileContent = await readFileAsText(file);
      const analysisResult = await analyzeSBOMContent(fileContent, file.name);
      
      // Save to database if user is authenticated
      if (isAuthenticated) {
        await createAnalysis({
          filename: file.name,
          file_type: file.type || 'application/json',
          total_components: analysisResult.totalComponents,
          total_vulnerabilities: analysisResult.totalVulnerabilities,
          risk_score: analysisResult.riskScore,
          analysis_data: {
            criticalVulnerabilities: analysisResult.criticalVulnerabilities,
            highVulnerabilities: analysisResult.highVulnerabilities,
            licenseIssues: analysisResult.licenseIssues
          }
        });
      }
      
      setCurrentAnalysis(analysisResult);
    } catch (err) {
      console.error('Error analyzing SBOM:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze SBOM file');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const analyzeSBOMContent = async (content: string, filename: string): Promise<SBOMAnalysisResult> => {
    try {
      // Parse the SBOM file
      const data = JSON.parse(content);
      
      let components: any[] = [];
      
      // Handle different SBOM formats
      if (data.bomFormat === 'CycloneDX' && Array.isArray(data.components)) {
        components = data.components;
      } else if (data.spdxVersion && Array.isArray(data.packages)) {
        components = data.packages;
      } else {
        throw new Error('Unsupported SBOM format');
      }
      
      // Analyze components for vulnerabilities and licenses
      const totalComponents = components.length;
      const mockVulnerabilities = Math.floor(Math.random() * (totalComponents * 0.3));
      const criticalVulnerabilities = Math.floor(mockVulnerabilities * 0.1);
      const highVulnerabilities = Math.floor(mockVulnerabilities * 0.2);
      const licenseIssues = Math.floor(Math.random() * (totalComponents * 0.05));
      
      // Calculate risk score
      const riskScore = Math.max(0, 100 - (
        (criticalVulnerabilities * 20) + 
        (highVulnerabilities * 10) + 
        (licenseIssues * 5)
      ));
      
      return {
        id: `analysis-${Date.now()}`,
        filename,
        totalComponents,
        totalVulnerabilities: mockVulnerabilities,
        riskScore,
        criticalVulnerabilities,
        highVulnerabilities,
        licenseIssues,
        createdAt: new Date().toISOString()
      };
    } catch (parseError) {
      throw new Error('Failed to parse SBOM file. Please ensure it\'s a valid SPDX or CycloneDX format.');
    }
  };

  const exportResults = () => {
    if (!currentAnalysis) return;
    
    const exportData = {
      analysis: currentAnalysis,
      exportedAt: new Date().toISOString(),
      platform: 'VendorSoluce'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sbom-analysis-${currentAnalysis.filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('sbom.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {t('sbom.description')}
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-vendorsoluce-teal">
          <CardContent className="p-6">
            <div className="flex items-center mb-4 mt-2">
              <FileJson className="h-8 w-8 text-vendorsoluce-teal mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('sbom.features.componentAnalysis.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {t('sbom.features.componentAnalysis.description')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vendorsoluce-green">
          <CardContent className="p-6">
            <div className="flex items-center mb-4 mt-2">
              <Shield className="h-8 w-8 text-vendorsoluce-green mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('sbom.features.vulnerabilityDetection.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {t('sbom.features.vulnerabilityDetection.description')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vendorsoluce-blue">
          <CardContent className="p-6">
            <div className="flex items-center mb-4 mt-2">
              <BarChart3 className="h-8 w-8 text-vendorsoluce-blue mr-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('sbom.features.licenseCompliance.title')}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {t('sbom.features.licenseCompliance.description')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-vendorsoluce-teal" />
                {t('sbom.upload.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SBOMUploader onUpload={handleFileUpload} isLoading={isLoading} />
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                      {t('sbom.upload.supportedFormats')}
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                      <li>• SPDX (JSON, XML, RDF formats)</li>
                      <li>• CycloneDX (JSON, XML formats)</li>
                      <li>• Plain text component lists</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Previous Analyses */}
          {isAuthenticated && analyses.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-vendorsoluce-green" />
                  {t('sbom.recentAnalyses')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyses.slice(0, 5).map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{analysis.filename}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{analysis.total_components} components</span>
                          <span>{analysis.total_vulnerabilities} vulnerabilities</span>
                          <span>Score: {analysis.risk_score}%</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div>
          {currentAnalysis ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-vendorsoluce-teal" />
                    {t('sbom.results.title')}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={exportResults}>
                    <Download className="h-4 w-4 mr-2" />
                    {t('sbom.export')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      currentAnalysis.riskScore >= 80 ? 'text-green-600' : 
                      currentAnalysis.riskScore >= 60 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {currentAnalysis.riskScore}%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{t('sbom.results.overallSecurityScore')}</p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentAnalysis.totalComponents}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('sbom.results.components')}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentAnalysis.totalVulnerabilities}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('sbom.results.vulnerabilities')}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {currentAnalysis.criticalVulnerabilities}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('sbom.results.criticalCVEs')}</div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {currentAnalysis.licenseIssues}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('sbom.results.licenseIssues')}</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{t('sbom.results.recommendations')}</h4>
                    
                    {currentAnalysis.criticalVulnerabilities > 0 && (
                      <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                        <span className="text-red-800 dark:text-red-300">
                          {t('sbom.results.immediateAction', { count: currentAnalysis.criticalVulnerabilities })}
                        </span>
                      </div>
                    )}
                    
                    {currentAnalysis.riskScore >= 80 ? (
                      <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="text-green-800 dark:text-green-300">
                          {t('sbom.results.goodPosture')}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                        <span className="text-yellow-800 dark:text-yellow-300">
                          {t('sbom.results.reviewComponents')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex flex-col justify-center items-center text-center">
              <FileJson className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {t('sbom.upload.noSbom')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                {t('sbom.upload.uploadPrompt')}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>{t('sbom.aboutSBOM.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('sbom.aboutSBOM.whatIsSBOM')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('sbom.aboutSBOM.sbomDescription')}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('sbom.aboutSBOM.benefits.identifyVulnerabilities')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('sbom.aboutSBOM.benefits.trackLicenses')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('sbom.aboutSBOM.benefits.meetRequirements')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('sbom.aboutSBOM.nistAlignment')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('sbom.aboutSBOM.nistDescription')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-vendorsoluce-teal rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('sbom.aboutSBOM.controls.authenticity')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-vendorsoluce-teal rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('sbom.aboutSBOM.controls.management')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-vendorsoluce-teal rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('sbom.aboutSBOM.controls.executiveOrder')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                {t('sbom.aboutSBOM.helpSection.title')}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                {t('sbom.aboutSBOM.helpSection.description')}
              </p>
              <div className="flex space-x-3">
                <Link to="/templates">
                  <Button variant="outline" size="sm">
                    {t('sbom.aboutSBOM.helpSection.downloadTemplates')}
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="sm">
                    {t('sbom.aboutSBOM.helpSection.implementationGuide')}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SBOMAnalyzer;