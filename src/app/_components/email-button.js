'use client';

export function EmailButton() {
  const user = "jojo.31.liu";
  const domain = "gmail.com";

  const handleContact = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <button
      onClick={handleContact}
      className="font-display mt-6 inline-block max-w-full -skew-x-2 bg-[var(--accent)] px-4 py-2.5 text-base break-all text-white shadow-[6px_6px_0_rgba(var(--ink-accent),0.3)] transition-transform hover:-translate-y-1 md:-skew-x-6 md:px-8 md:py-3 md:text-2xl"
    >
      {/* Visually reconstruct the email on the client side */}
      <span className="block skew-x-6">{user}@{domain}</span>
    </button>
  );
}
