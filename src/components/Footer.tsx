// components/Footer.tsx
import { Globe, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t text-gray-700 max-w-[1840px] mx-auto w-full">
      <div className=" px-6 py-12 grid max-[517px]:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Help Centre</Link></li>
            <li><Link href="#">Get help with a safety issue</Link></li>
            <li><Link href="#">AirCover</Link></li>
            <li><Link href="#">Anti-discrimination</Link></li>
            <li><Link href="#">Disability support</Link></li>
            <li><Link href="#">Cancellation options</Link></li>
            <li><Link href="#">Report neighbourhood concern</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-4">Hosting</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Airbnb your home</Link></li>
            <li><Link href="#">Airbnb your experience</Link></li>
            <li><Link href="#">Airbnb your service</Link></li>
            <li><Link href="#">AirCover for Hosts</Link></li>
            <li><Link href="#">Hosting resources</Link></li>
            <li><Link href="#">Community forum</Link></li>
            <li><Link href="#">Hosting responsibly</Link></li>
            <li><Link href="#">Join a free Hosting class</Link></li>
            <li><Link href="#">Find a co-host</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-4">Airbnb</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">2025 Summer Release</Link></li>
            <li><Link href="#">Newsroom</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Investors</Link></li>
            <li><Link href="#">Airbnb.org emergency stays</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          {/* Left side */}
          <p>
            © 2025 Airbnb, Inc. · <Link href="#">Privacy</Link> ·{" "}
            <Link href="#">Terms</Link> · <Link href="#">Sitemap</Link> ·{" "}
            <Link href="#">Company details</Link>
          </p>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:underline">
              <Globe size={16} /> English (IN)
            </button>
            <button className="hover:underline">₹ INR</button>
            <Link href="#"><Facebook size={16} /></Link>
            <Link href="#"><Twitter size={16} /></Link>
            <Link href="#"><Instagram size={16} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
