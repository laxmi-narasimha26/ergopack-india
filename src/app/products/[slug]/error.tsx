'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
      <div className="bg-gray-900 p-4 rounded-md mb-6 max-w-2xl w-full overflow-auto">
        <p className="font-mono text-sm text-red-300">{error.message}</p>
        {error.stack && (
          <pre className="mt-4 text-xs text-gray-500 whitespace-pre-wrap">{error.stack}</pre>
        )}
      </div>
      <Button onClick={() => reset()} className="bg-white text-black hover:bg-gray-200">
        Try again
      </Button>
    </div>
  );
}
