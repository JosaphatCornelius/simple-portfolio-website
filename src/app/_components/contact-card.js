"use client";

import { useState } from "react";
import { PROFILE } from "./data";

const inputClasses =
  "w-full border-2 border-[#0a2ec4]/30 bg-[#eafbff] px-3 py-2 text-base text-[#0c1430] placeholder:text-[#0c1430]/40 focus:border-[#0a2ec4] focus:outline-none";

export function ContactCard() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const sendDisabled = !subject.trim() && !message.trim();

  function composeMailto() {
    const fullSubject = name.trim()
      ? `${subject.trim() || "Hello"} — from ${name.trim()}`
      : subject.trim() || "Hello";
    const params = new URLSearchParams({
      subject: fullSubject,
      body: message,
    });
    // URLSearchParams encodes spaces as "+", which mail clients show
    // literally; mailto needs percent-encoding.
    window.location.href = `mailto:${PROFILE.email}?${params
      .toString()
      .replaceAll("+", "%20")}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context); the
      // plain email link right above stays usable.
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        composeMailto();
      }}
      className="mt-6 flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className={inputClasses}
        />
        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Subject"
          aria-label="Subject"
          className={inputClasses}
        />
      </div>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Your message…"
        aria-label="Your message"
        rows={4}
        className={inputClasses}
      />
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sendDisabled}
          className="font-display -skew-x-6 bg-[#e60012] px-8 py-2.5 text-xl text-white shadow-[5px_5px_0_rgba(120,0,10,0.3)] transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <span className="flex items-center gap-2 skew-x-6">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs">
              A
            </span>
            SEND
          </span>
        </button>
        <button
          type="button"
          onClick={copyEmail}
          className="font-display -skew-x-6 border-2 border-[#0a2ec4] px-6 py-2.5 text-xl text-[#0a2ec4] transition-colors hover:bg-[#0a2ec4] hover:text-white"
        >
          <span className="block skew-x-6">
            {copied ? "COPIED!" : "COPY EMAIL"}
          </span>
        </button>
      </div>
      <p className="text-sm text-[#0c1430]/60">
        Opens your own mail app — no data leaves this page.
      </p>
    </form>
  );
}
