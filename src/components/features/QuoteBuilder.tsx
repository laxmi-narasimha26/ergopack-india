'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  Settings,
  FileText,
  Download,
  Send,
  Save,
  X,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface QuoteConfig {
  productLine: 'economy' | 'xpert' | null;
  quantity: number;
  features: string[];
  shipping: 'standard' | 'express' | 'freight' | null;
  installation: boolean;
  training: boolean;
  warranty: '1year' | '3year' | '5year';
  companyName: string;
  contactEmail: string;
  contactPhone: string;
}

const steps = [
  { id: 1, name: 'Product Selection', icon: Package },
  { id: 2, name: 'Customization', icon: Settings },
  { id: 3, name: 'Shipping & Services', icon: Truck },
  { id: 4, name: 'Review & Submit', icon: FileText },
];

export default function QuoteBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<QuoteConfig>({
    productLine: null,
    quantity: 1,
    features: [],
    shipping: null,
    installation: false,
    training: false,
    warranty: '1year',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const updateConfig = (updates: Partial<QuoteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const calculateTotal = () => {
    let base = 0;
    if (config.productLine === 'economy') base = 15000;
    if (config.productLine === 'xpert') base = 35000;

    const quantity = base * config.quantity;
    const features = config.features.length * 2500;

    let shipping = 0;
    if (config.shipping === 'standard') shipping = 500;
    if (config.shipping === 'express') shipping = 1500;
    if (config.shipping === 'freight') shipping = 3000;

    const installation = config.installation ? 5000 : 0;
    const training = config.training ? 3000 : 0;

    let warranty = 0;
    if (config.warranty === '3year') warranty = 2000;
    if (config.warranty === '5year') warranty = 5000;

    return quantity + features + shipping + installation + training + warranty;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return config.productLine !== null && config.quantity > 0;
      case 2:
        return true;
      case 3:
        return config.shipping !== null;
      case 4:
        return config.companyName && config.contactEmail;
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-slate-900 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <motion.div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                        isCompleted
                          ? 'bg-amber-500 border-amber-500'
                          : isActive
                            ? 'bg-amber-500/20 border-amber-500'
                            : 'bg-slate-800 border-slate-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      ) : (
                        <Icon
                          className={`h-6 w-6 ${isActive ? 'text-amber-400' : 'text-slate-500'}`}
                        />
                      )}
                    </motion.div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 mt-[-2rem]">
                      <div
                        className={`h-full transition-all ${
                          isCompleted ? 'bg-amber-500' : 'bg-slate-700'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Product Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Select Your Product Line</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      id: 'economy',
                      name: 'Economy Line',
                      price: '$15,000',
                      description: 'Perfect for small to medium operations',
                      features: ['Basic securing system', 'Standard warranty', 'Email support'],
                    },
                    {
                      id: 'xpert',
                      name: 'X-pert Line',
                      price: '$35,000',
                      description: 'Premium solution for mission-critical loads',
                      features: [
                        'ChainLance Precision System',
                        'IoT monitoring',
                        '24/7 support',
                        'Extended warranty',
                      ],
                    },
                  ].map((product) => (
                    <motion.button
                      key={product.id}
                      onClick={() => updateConfig({ productLine: product.id as any })}
                      className={`text-left p-6 rounded-xl border-2 transition-all ${
                        config.productLine === product.id
                          ? 'bg-amber-500/10 border-amber-500'
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white">{product.name}</h4>
                          <p className="text-slate-400 text-sm mt-1">{product.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-400">{product.price}</p>
                          <p className="text-xs text-slate-500">per unit</p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {product.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {config.productLine === product.id && (
                        <motion.div
                          className="mt-4 p-2 bg-amber-500/20 rounded-lg text-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="text-amber-400 text-sm font-semibold">Selected</p>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Quantity: {config.quantity}
                  </label>
                  <input
                    type="range"
                    value={config.quantity}
                    onChange={(e) => updateConfig({ quantity: Number(e.target.value) })}
                    min="1"
                    max="50"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 unit</span>
                    <span>50 units</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Customization */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Customize Your System</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Add Premium Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: 'iot-advanced',
                          name: 'Advanced IoT Monitoring',
                          price: '+$2,500',
                          description: 'Real-time alerts and predictive maintenance',
                        },
                        {
                          id: 'custom-integration',
                          name: 'Custom ERP Integration',
                          price: '+$2,500',
                          description: 'Seamless integration with your systems',
                        },
                        {
                          id: 'remote-diagnostics',
                          name: 'Remote Diagnostics',
                          price: '+$2,500',
                          description: '24/7 remote system monitoring',
                        },
                        {
                          id: 'compliance-package',
                          name: 'Compliance Automation',
                          price: '+$2,500',
                          description: 'Automatic regulatory reporting',
                        },
                      ].map((feature) => {
                        const isSelected = config.features.includes(feature.id);

                        return (
                          <motion.button
                            key={feature.id}
                            onClick={() => {
                              updateConfig({
                                features: isSelected
                                  ? config.features.filter((f) => f !== feature.id)
                                  : [...config.features, feature.id],
                              });
                            }}
                            className={`p-4 rounded-lg border transition-all text-left ${
                              isSelected
                                ? 'bg-amber-500/10 border-amber-500'
                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {isSelected ? (
                                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                                ) : (
                                  <Circle className="h-5 w-5 text-slate-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h5 className="font-semibold text-white">{feature.name}</h5>
                                  <span className="text-amber-400 font-semibold text-sm">
                                    {feature.price}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-400">{feature.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Warranty Options</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: '1year', name: '1 Year', price: 'Included' },
                        { id: '3year', name: '3 Years', price: '+$2,000' },
                        { id: '5year', name: '5 Years', price: '+$5,000' },
                      ].map((warranty) => (
                        <button
                          key={warranty.id}
                          onClick={() => updateConfig({ warranty: warranty.id as any })}
                          className={`p-4 rounded-lg border transition-all ${
                            config.warranty === warranty.id
                              ? 'bg-amber-500/10 border-amber-500'
                              : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <p className="font-semibold text-white mb-1">{warranty.name}</p>
                          <p className="text-sm text-amber-400">{warranty.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Shipping & Services */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Shipping & Additional Services
                </h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Shipping Method</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'standard',
                          name: 'Standard Shipping',
                          price: '$500',
                          time: '10-14 business days',
                        },
                        {
                          id: 'express',
                          name: 'Express Shipping',
                          price: '$1,500',
                          time: '5-7 business days',
                        },
                        {
                          id: 'freight',
                          name: 'White Glove Freight',
                          price: '$3,000',
                          time: '3-5 business days',
                        },
                      ].map((shipping) => (
                        <button
                          key={shipping.id}
                          onClick={() => updateConfig({ shipping: shipping.id as any })}
                          className={`p-5 rounded-lg border transition-all text-left ${
                            config.shipping === shipping.id
                              ? 'bg-amber-500/10 border-amber-500'
                              : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <h5 className="font-semibold text-white mb-2">{shipping.name}</h5>
                          <p className="text-2xl font-bold text-amber-400 mb-1">{shipping.price}</p>
                          <p className="text-sm text-slate-400">{shipping.time}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Professional Services</h4>
                    <div className="space-y-3">
                      <label className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.installation}
                          onChange={(e) => updateConfig({ installation: e.target.checked })}
                          className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 bg-slate-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-white">Professional Installation</h5>
                            <span className="text-amber-400 font-semibold">+$5,000</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Expert installation and system setup by certified technicians
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.training}
                          onChange={(e) => updateConfig({ training: e.target.checked })}
                          className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 bg-slate-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-white">On-Site Training</h5>
                            <span className="text-amber-400 font-semibold">+$3,000</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Comprehensive training for your team (up to 10 people)
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Review Your Quote</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Configuration Summary */}
                  <div>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Configuration Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="pb-4 border-b border-slate-700">
                          <p className="text-sm text-slate-400 mb-1">Product Line</p>
                          <p className="text-white font-semibold">
                            {config.productLine === 'economy' ? 'Economy Line' : 'X-pert Line'}
                          </p>
                          <p className="text-sm text-slate-400">Quantity: {config.quantity}</p>
                        </div>

                        {config.features.length > 0 && (
                          <div className="pb-4 border-b border-slate-700">
                            <p className="text-sm text-slate-400 mb-2">Premium Features</p>
                            <ul className="space-y-1">
                              {config.features.map((f) => (
                                <li key={f} className="text-white text-sm flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                                  {f.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pb-4 border-b border-slate-700">
                          <p className="text-sm text-slate-400 mb-1">Shipping</p>
                          <p className="text-white font-semibold">
                            {config.shipping
                              ?.replace(/-/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>

                        {(config.installation || config.training) && (
                          <div className="pb-4 border-b border-slate-700">
                            <p className="text-sm text-slate-400 mb-2">Services</p>
                            <ul className="space-y-1">
                              {config.installation && (
                                <li className="text-white text-sm flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                                  Professional Installation
                                </li>
                              )}
                              {config.training && (
                                <li className="text-white text-sm flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                                  On-Site Training
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div>
                          <p className="text-sm text-slate-400 mb-1">Warranty</p>
                          <p className="text-white font-semibold">
                            {config.warranty === '1year' && '1 Year Standard'}
                            {config.warranty === '3year' && '3 Years Extended'}
                            {config.warranty === '5year' && '5 Years Premium'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-white">Total Estimate</span>
                          <span className="text-3xl font-bold text-amber-400">
                            ${calculateTotal().toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Final price subject to verification
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={config.companyName}
                            onChange={(e) => updateConfig({ companyName: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                            placeholder="Your Company Ltd."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={config.contactEmail}
                            onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                            placeholder="contact@company.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={config.contactPhone}
                            onChange={(e) => updateConfig({ contactPhone: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        <div className="pt-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 bg-slate-700"
                            />
                            <span className="text-sm text-slate-400">
                              I agree to receive communications about this quote and related
                              products
                            </span>
                          </label>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="bg-slate-900 border-t border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  className="text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep === 4 && (
                <>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </>
              )}

              {currentStep < steps.length ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Quote Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
