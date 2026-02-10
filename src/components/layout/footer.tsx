import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("border-t py-16", className)}>
      <div className="container mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-bold">MediStore</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Trusted Online OTC Medicine Shop
            </p>
            <p className="mt-4 text-sm font-medium border-b border-gray-400 inline-block hover:border-primary transition-colors">
              © 2026 MediStore
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primary hover:underline"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary hover:underline"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-primary hover:underline"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 font-semibold">Policies</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="hover:text-primary hover:underline"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Email: support@medistore.com</li>
              <li>Phone: +880-1XXXXXXXXX</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
