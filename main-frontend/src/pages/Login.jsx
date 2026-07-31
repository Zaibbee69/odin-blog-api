import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Login
 * Simple sign-in page. Posts credentials to POST /auth/login, which
 * returns only { token } (a JWT with { sub, email, isAuthor } in its
 * payload — no separate user object). Since there's no name in the
 * token, this decodes the payload client-side and hands both the
 * raw token and that decoded info back via `onLoginSuccess` so the
 * app can store them however it manages auth state.
 */
function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const json = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid Credentials");
        }
        throw new Error("Something went wrong. Please try again.");
      }

      const { token } = await response.json();
      const decodedUser = decodeJwtPayload(token);
      onLoginSuccess?.(token, decodedUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-black antialiased">
      <Navbar />

      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-20">
        <h1 className="font-serif text-3xl tracking-tight text-black">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to leave comments and join the discussion.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-zinc-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-black px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-sm text-zinc-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-black underline underline-offset-2">
            Sign up
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}
