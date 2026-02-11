import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center  from-slate-900 to-slate-800 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-white mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-200 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
