import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-dark-300 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Search className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800">
          <p className="text-dark-400 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products/xpert-line" className="text-dark-300 hover:text-white transition-colors">
              X-pert Line
            </Link>
            <Link href="/products/economy-line" className="text-dark-300 hover:text-white transition-colors">
              E-conomy Line
            </Link>
            <Link href="/industries" className="text-dark-300 hover:text-white transition-colors">
              Industries
            </Link>
            <Link href="/blog" className="text-dark-300 hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
