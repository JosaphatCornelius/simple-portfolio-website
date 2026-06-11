import { createOgImage, OG_SIZE } from "./_lib/og";

export const alt = "Josaphat Cornelius — Full Stack Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    eyebrow: "PORTFOLIO",
    title: "Josaphat Cornelius",
    footer: "FULL STACK DEVELOPER · JAKARTA",
  });
}
