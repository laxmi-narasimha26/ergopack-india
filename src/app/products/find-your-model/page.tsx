'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useFadeIn } from '@/lib/hooks/useScrollAnimation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Package,
  Battery,
  Zap,
  DollarSign,
  TrendingUp,
  Award,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import productsData from '../../../../products-data.json';

interface Question {
  id: string;
  question: string;
  icon: any;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: 'duty',
    question: 'What type of duty will your strapping system handle?',
    icon: Package,
    options: [
      { value: 'ultra-light', label: 'Ultra-Light-Duty', description: 'Light packages, minimal tension' },
      { value: 'light', label: 'Light-Duty', description: 'Standard packaging applications' },
      { value: 'medium-heavy', label: 'Medium/Heavy-Duty', description: 'Heavy pallets, high tension' },
      { value: 'manual', label: 'Manual Operation', description: 'Hand-crank operation' },
      { value: 'multi-material', label: 'Multi-Material', description: 'Various strap types' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget preference?',
    icon: DollarSign,
    options: [
      { value: 'economy', label: 'Economy', description: 'Best value, proven technology' },
      { value: 'premium', label: 'Premium', description: 'Latest technology, maximum performance' },
      { value: 'flexible', label: 'Flexible', description: 'Open to both options' },
    ],
  },
  {
    id: 'battery',
    question: 'What battery technology do you prefer?',
    icon: Battery,
    options: [
      { value: 'lead-fleece', label: 'Lead-Fleece', description: 'Proven, affordable' },
      { value: 'lithium', label: 'Lithium-Ion', description: 'Lighter, faster charging, more cycles' },
      { value: 'manual', label: 'No Battery (Manual)', description: 'Hand-crank operation' },
      { value: 'no-preference', label: 'No Preference', description: 'Either is fine' },
    ],
  },
  {
    id: 'volume',
    question: 'What is your expected strapping volume?',
    icon: TrendingUp,
    options: [
      { value: 'low', label: 'Low Volume', description: 'Occasional use, < 100 straps/day' },
      { value: 'medium', label: 'Medium Volume', description: 'Regular use, 100-500 straps/day' },
      { value: 'high', label: 'High Volume', description: 'Heavy use, 500+ straps/day' },
    ],
  },
  {
    id: 'features',
    question: 'Which features are most important to you?',
    icon: Sparkles,
    options: [
      { value: 'basic', label: 'Basic Reliability', description: 'Simple operation, proven performance' },
      { value: 'advanced', label: 'Advanced Features', description: 'Touchscreen, laser positioning' },
      { value: 'portable', label: 'Portability', description: 'Mobile strapping solutions' },
    ],
  },
];

export default function FindYourModelPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const titleRef = useFadeIn({ start: 'top 80%' });

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Recommendation logic
  const getRecommendations = () => {
    const products = productsData.products;
    const recommendations: { id: string; score: number; reasons: string[] }[] = [];

    Object.entries(products).forEach(([key, product]: [string, any]) => {
      let score = 0;
      const reasons: string[] = [];

      // Application type matching
      if (answers.duty === 'ultra-light' && product.applicationType === 'Ultra-Light-Duty') {
        score += 30;
        reasons.push('Perfect match for ultra-light-duty applications');
      }
      if (answers.duty === 'light' && product.applicationType === 'Light-Duty') {
        score += 30;
        reasons.push('Ideal for light-duty packaging');
      }
      if (answers.duty === 'medium-heavy' && product.applicationType === 'Medium/Heavy-Duty') {
        score += 30;
        reasons.push('Built for medium to heavy-duty operations');
      }
      if (answers.duty === 'manual' && product.applicationType === 'Manual Operation') {
        score += 30;
        reasons.push('Manual hand-crank operation as requested');
      }
      if (answers.duty === 'multi-material' && product.applicationType?.includes('Multi-Material')) {
        score += 30;
        reasons.push('Supports multiple strap material types');
      }

      // Budget matching
      if (answers.budget === 'economy' && product.line === 'Economy Line') {
        score += 25;
        reasons.push('Economy line offers best value');
      }
      if (answers.budget === 'premium' && product.line === 'X-pert Line') {
        score += 25;
        reasons.push('Premium X-pert line with advanced features');
      }

      // Battery matching
      if (answers.battery === 'lithium' && product.battery.type === 'Lithium-Ion') {
        score += 20;
        reasons.push('Lithium-Ion battery: lighter, faster charging');
      }
      if (answers.battery === 'lead-fleece' && product.battery.type?.includes('lead-fleece')) {
        score += 20;
        reasons.push('Proven lead-fleece battery technology');
      }
      if (answers.battery === 'manual' && product.battery.type === 'None - Manual Operation') {
        score += 20;
        reasons.push('No battery needed - manual operation');
      }

      // Volume matching
      if (answers.volume === 'high' && product.battery.strappingCycles >= 1000) {
        score += 15;
        reasons.push('High capacity for heavy use');
      }
      if (answers.volume === 'medium' && product.battery.strappingCycles >= 350) {
        score += 15;
        reasons.push('Good capacity for regular use');
      }
      if (answers.volume === 'low') {
        score += 10;
        reasons.push('Suitable for occasional use');
      }

      // Features matching
      if (answers.features === 'advanced' && product.includedFeatures?.includes('Siemens Touchscreen')) {
        score += 15;
        reasons.push('Advanced touchscreen and laser positioning');
      }
      if (answers.features === 'portable' && (key === 'RE' || key === 'GO')) {
        score += 20;
        reasons.push('Premium mobile strapping solution');
      }
      if (answers.features === 'basic' && product.line === 'Economy Line') {
        score += 10;
        reasons.push('Simple, reliable operation');
      }

      if (score > 0) {
        recommendations.push({
          id: key,
          score,
          reasons: reasons.slice(0, 3),
        });
      }
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(rec => ({
        ...rec,
        product: products[rec.id as keyof typeof products],
      }));
  };

  const currentQuestion = questions[currentStep];
  const selectedAnswer = answers[currentQuestion?.id];
  const canProceed = !!selectedAnswer;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <MainLayout>
      <div className="bg-slate-950 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div ref={titleRef} className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-2 mb-6">
                <Target className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-semibold text-amber-500">Smart Product Finder</span>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
                Find Your
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  Perfect Model
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
                Answer a few quick questions and we'll recommend the ideal ErgoPack strapping
                system for your specific needs and application.
              </p>
            </div>
          </div>
        </section>

        {!showResults ? (
          <>
            {/* Progress Bar */}
            <section className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 py-4">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-amber-500">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </section>

            {/* Question Section */}
            <section className="bg-slate-950 py-12">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-slate-800 bg-slate-900/50 p-8 md:p-12">
                      {/* Question Header */}
                      <div className="flex items-start gap-4 mb-8">
                        <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                          <currentQuestion.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {currentQuestion.question}
                          </h2>
                          <p className="text-slate-400">Select the option that best describes your needs</p>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-3 mb-8">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(currentQuestion.id, option.value)}
                            className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                              selectedAnswer === option.value
                                ? 'border-amber-500 bg-amber-500/10'
                                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-lg font-semibold text-white">{option.label}</span>
                                  {selectedAnswer === option.value && (
                                    <CheckCircle2 className="h-5 w-5 text-amber-500" />
                                  )}
                                </div>
                                {option.description && (
                                  <p className="text-sm text-slate-400">{option.description}</p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between gap-4">
                        <Button
                          onClick={handleBack}
                          disabled={currentStep === 0}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={!canProceed}
                          variant="primary"
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-slate-950 py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-4 py-2 mb-4">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">Results Ready</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Your Perfect Matches
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Based on your responses, we recommend these models for your application
                </p>
              </motion.div>

              {/* Recommended Products */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {getRecommendations().map((rec: any, index) => {
                  const isTopChoice = index === 0;
                  const lineColor = rec.product.line.includes('X-pert') ? 'amber' : 'blue';

                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        className={`border-2 ${
                          isTopChoice
                            ? 'border-green-500/60 bg-gradient-to-br from-green-500/10 to-slate-900'
                            : `border-${lineColor}-500/30 bg-gradient-to-br from-${lineColor}-500/5 to-slate-900`
                        } relative overflow-hidden h-full flex flex-col`}
                      >
                        {isTopChoice && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                            TOP CHOICE
                          </div>
                        )}

                        <div className="p-6 border-b border-slate-800">
                          <div className={`inline-flex items-center gap-2 rounded-full border border-${lineColor}-500/50 bg-${lineColor}-500/10 px-3 py-1 mb-3`}>
                            {lineColor === 'amber' ? (
                              <Zap className={`h-3 w-3 text-${lineColor}-500`} />
                            ) : (
                              <Award className={`h-3 w-3 text-${lineColor}-500`} />
                            )}
                            <span className={`text-xs font-semibold text-${lineColor}-500`}>
                              {rec.product.line}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{rec.product.model}</h3>
                          <p className="text-sm text-slate-400 mb-3">{rec.product.fullName}</p>
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-white">{rec.score}</div>
                            <div className="text-xs text-slate-500">Match Score</div>
                          </div>
                        </div>

                        <div className="p-6 flex-1">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            Why This Model?
                          </p>
                          <ul className="space-y-2 mb-6">
                            {rec.reasons.map((reason: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 text-${lineColor}-500`} />
                                <span className="text-sm text-slate-300">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6 pt-0">
                          <Link href={`/products/${rec.id.toLowerCase()}`}>
                            <Button
                              size="sm"
                              variant="primary"
                              className={`w-full ${
                                isTopChoice
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                  : `bg-gradient-to-r from-${lineColor}-500 to-${lineColor}-600 hover:from-${lineColor}-600 hover:to-${lineColor}-700`
                              } text-white`}
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Start Over
                </Button>
                <Link href="/products/compare-all">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Compare All Models
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
