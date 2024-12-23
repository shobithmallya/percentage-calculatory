import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 Financial Calculator. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

  );
} 