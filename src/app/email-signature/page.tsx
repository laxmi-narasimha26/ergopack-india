import React from 'react';
import Image from 'next/image';

export default function EmailSignaturePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="bg-white p-12 rounded-xl shadow-lg border border-gray-100 max-w-6xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
          LogiMAT India 2026 - Email Footer
        </h1>

        {/* Footer Image Display */}
        <div className="select-text bg-white p-6 border border-dashed border-gray-300 rounded-lg group hover:border-blue-500 transition-colors">
          {/* Note: Update the src to the actual hosted URL */}
          <Image
            src="/newsletter/logimat-footer.png"
            alt="LogiMAT India 2026 - 5-7 February 2026 | Bombay Exhibition Centre | Booth C09-07"
            width={1200}
            height={400}
            className="block w-full h-auto max-w-[1200px] mx-auto"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            To use: Right-click the image, Copy, and Paste into your email.
          </p>
          <p className="text-xs text-gray-400">
            Note: Ensure the image is hosted publicly for email recipients to see it.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Available sizes: 1200x400 (banner), 1200x200 (signature strip)
          </p>
        </div>
      </div>
    </div>
  );
}
