/**
 * Google Analytics 4 helper.
 * Replace 'G-XXXXXXXXXX' in index.html with your real Measurement ID.
 */

export const trackPageView = (path, title) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
};

export const trackEvent = (name, params = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
};