'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-500/20 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-accent-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-dark-300 text-lg mb-8">
            We encountered an unexpected error. Don't worry, we're on it.
            <br />
            Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={reset} className="w-full sm:w-auto">
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <div className="mt-8 p-4 bg-dark-900 border border-dark-800 rounded-lg">
            <p className="text-sm text-dark-400">
              Error ID: <code className="text-accent-500">{error.digest}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
