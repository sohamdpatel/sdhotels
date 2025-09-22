"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      {/* Logo */}
  <Link href="/" className="flex items-center space-x-2 mr-4 z-10">
          <span className="text-4xl font-bold text-red-500">SD</span>
          <span className="text-xl hidden md:inline font-semibold text-gray-800">Travel</span>
        </Link>

      {/* Oops text */}
      <h1 className="text-7xl font-bold text-gray-800">Oops!</h1>
      <p className="mt-4 text-lg text-gray-600">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <p className="mt-2 text-gray-500">Error code: 404</p>

      {/* Illustration */}
      

      {/* Links */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 text-blue-600">
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
        <Link href="/help">Help</Link>
        <Link href="/travel">Traveling</Link>
        <Link href="/host">Hosting</Link>
        <Link href="/trust">Trust & Safety</Link>
        <Link href="/sitemap">Sitemap</Link>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
