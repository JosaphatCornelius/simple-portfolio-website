const value = process.env.NEXT_PUBLIC_SITE_URL;

if (!value) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}

export const SITE_URL = value;
