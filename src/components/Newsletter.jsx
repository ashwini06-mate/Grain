import { useState } from "react";
import { keys, readStore, writeStore } from "../utils/storage";

export default function Newsletter({ tone = "dark" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(() => Boolean(readStore(keys.newsletter, "")));

  function submit(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      setDone(false);
      return;
    }
    writeStore(keys.newsletter, email);
    setError("");
    setDone(true);
    setEmail("");
  }

  const dark = tone === "dark";

  return (
    <form onSubmit={submit} className="max-w-md" noValidate>
      <label htmlFor="newsletter-email" className={`mb-2 block text-sm ${dark ? "text-cream/80" : "text-ink/70"}`}>
        Notes on new lots and seasonal packs
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          aria-invalid={Boolean(error)}
          className="field sm:flex-1"
        />
        <button
          type="submit"
          className={`h-12 rounded-full px-5 text-sm font-semibold ${dark ? "bg-wheat text-ink" : "bg-forest text-cream"}`}
        >
          Join the list
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
      {done && !error && (
        <p className={`mt-2 text-sm ${dark ? "text-wheat" : "text-olive"}`}>
          Saved on this device. This demo does not send email.
        </p>
      )}
    </form>
  );
}
