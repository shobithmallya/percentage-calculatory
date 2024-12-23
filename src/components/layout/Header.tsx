import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Header() {
    return (
        <header className="border-b">
        <div className="container mx-auto px-4 py-4">
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

