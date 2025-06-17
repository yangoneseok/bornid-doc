import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-primary">BornID</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Revolutionizing digital identity verification with cutting-edge
              technology.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                API
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BornID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
