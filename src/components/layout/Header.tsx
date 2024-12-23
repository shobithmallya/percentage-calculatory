import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Header() {
    return (
        <header className="relative w-full border-b border-grid sticky top-0 bg-white">
          <div className="absolute inset-0"></div>
          <div className="relative z-10 max-w-screen-xl mx-auto px-8 py-4 border-l border-r border-grid">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <span className="font-bold text-xl">Logo</span>
                <Separator orientation="vertical" className="h-6" />
                <div className="space-x-4">
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Docs</a>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Components</a>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Blocks</a>
                </div>
              </div>
            </nav>
          </div>
        </header>
    );
}