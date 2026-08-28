import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7fd] text-[#0f172a] p-4 text-center">
      <h2 className="text-4xl font-extrabold mb-2">404 - Page Not Found</h2>
      <p className="text-slate-600 mb-6 text-sm">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-5 py-2 rounded-full bg-[#0f172a] text-white text-xs font-semibold hover:bg-slate-800 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
