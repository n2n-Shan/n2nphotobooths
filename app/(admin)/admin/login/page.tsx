"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const next = searchParams.get("next") ?? "/admin";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/admin/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-black text-champagne">N2N</span>
          <span className="ml-2 text-sm font-bold uppercase tracking-widest text-white/60">Admin</span>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-champagne/30 bg-champagne/5 p-8 text-center">
            <div className="mb-3 text-3xl">📧</div>
            <h2 className="text-lg font-bold text-white">Check your email</h2>
            <p className="mt-2 text-sm text-white/60">
              We sent a magic link to <strong className="text-white">{email}</strong>.
              Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-[#1a1a1a] p-8">
            <h1 className="mb-6 text-xl font-bold text-white">Sign in</h1>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/12 bg-[#242424] px-4 py-3 text-white placeholder-white/30 outline-none focus:border-champagne"
              />
            </label>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-5 w-full disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send magic link →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
