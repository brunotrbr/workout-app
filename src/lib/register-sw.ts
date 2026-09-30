/**
 * Guarded service-worker registration wrapper.
 * Registers /sw.js only in production, outside iframes and outside Lovable
 * preview/dev hosts. In any refused context it unregisters stale app SWs.
 * Supports ?sw=off as a kill switch.
 */

const REFUSED_HOSTS = ["lovableproject.com", "lovableproject-dev.com", "beta.lovable.dev"];

function isRefusedContext(): boolean {
  if (!import.meta.env.PROD) return true;
  if (typeof window === "undefined") return true;
  if (window.self !== window.top) return true;
  const host = window.location.hostname;
  if (host.startsWith("id-preview--") || host.startsWith("preview--")) return true;
  if (REFUSED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return true;
  if (new URLSearchParams(window.location.search).get("sw") === "off") return true;
  return false;
}

async function unregisterAppServiceWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations
      .filter((reg) => reg.active?.scriptURL.endsWith("/sw.js"))
      .map((reg) => reg.unregister()),
  );
}

export async function registerAppServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (isRefusedContext()) {
    await unregisterAppServiceWorkers();
    return;
  }
  await navigator.serviceWorker.register("/sw.js");
}
