import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// Fetched without a browser user agent, css2 serves plain TTF urls, which is
// the format satori accepts.
const ANTON_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Anton&display=swap";

async function loadAntonFont() {
  try {
    const css = await (await fetch(ANTON_CSS_URL)).text();
    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return undefined;
    const data = await (await fetch(url)).arrayBuffer();
    return [{ name: "Anton", data, style: "normal", weight: 400 }];
  } catch {
    // A font fetch failure must never fail the build; satori falls back to
    // its default font.
    return undefined;
  }
}

export async function createOgImage({ eyebrow, title, footer }) {
  const fonts = await loadAntonFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "linear-gradient(172deg, #2adcf9 0%, #13a5ef 25%, #0b55dc 55%, #0729ad 80%, #041672 100%)",
          fontFamily: fonts ? "Anton" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            transform: "skewX(-12deg)",
            background: "#e60012",
            color: "#ffffff",
            padding: "10px 28px",
            fontSize: 34,
            letterSpacing: 4,
            boxShadow: "6px 6px 0 rgba(120,0,10,0.35)",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            transform: "skewX(-8deg)",
            color: "#ffffff",
            fontSize: title.length > 28 ? 76 : 104,
            lineHeight: 1.02,
            textShadow: "8px 8px 0 rgba(3,18,110,0.55)",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 48,
            color: "#9ff0ff",
            fontSize: 30,
            letterSpacing: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 22,
              height: 22,
              marginRight: 18,
              border: "5px solid #2de1ff",
              transform: "rotate(45deg)",
            }}
          />
          {footer}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
