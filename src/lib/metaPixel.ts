declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export function trackContact() {
  window.fbq?.("track", "Contact");
}

export function trackLead() {
  window.fbq?.("track", "Lead");
}
