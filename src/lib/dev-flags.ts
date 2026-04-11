/**
 * Dev feature flags (cross-project convention).
 *   ?dev=<name>     → localStorage "dev-mode"  (single value; "off"/"" clears)
 *   ?tools=<a,b,c>  → localStorage "dev-tools" (comma list; "off"/"" clears)
 * URL values fully replace stored values; absent params leave storage alone.
 * Call syncDevFlagsFromUrl() once per page load before reading flags.
 */

const MODE_KEY = "dev-mode";
const TOOLS_KEY = "dev-tools";

export function getDevMode(): string | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const value = localStorage.getItem(MODE_KEY);
    return value && value !== "off" ? value : null;
  } catch (err) {
    console.warn("[dev-flags] localStorage read failed:", err);
    return null;
  }
}

export function getDevTools(): Set<string> {
  try {
    if (typeof localStorage === "undefined") return new Set();
    return parseToolsList(localStorage.getItem(TOOLS_KEY) ?? "");
  } catch (err) {
    console.warn("[dev-flags] localStorage read failed:", err);
    return new Set();
  }
}

export function hasTool(name: string): boolean {
  return getDevTools().has(name);
}

/**
 * Read `?dev` and `?tools` from the current URL and mirror them into localStorage.
 * Declarative: whatever the URL says becomes the new persisted state.
 * If a param is absent from the URL, its stored value is left untouched.
 *
 * Wrapped in try/catch because Safari Private Browsing and some sandboxed
 * contexts leave `localStorage` defined but throw on `setItem` — an uncaught
 * throw here would halt the calling module script and break unrelated code.
 */
export function syncDevFlagsFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  try {
    if (params.has("dev")) {
      const value = params.get("dev") ?? "";
      if (value === "" || value === "off") {
        localStorage.removeItem(MODE_KEY);
      } else {
        localStorage.setItem(MODE_KEY, value);
      }
    }

    if (params.has("tools")) {
      const value = params.get("tools") ?? "";
      const tools = value === "off" ? new Set<string>() : parseToolsList(value);
      if (tools.size === 0) {
        localStorage.removeItem(TOOLS_KEY);
      } else {
        localStorage.setItem(TOOLS_KEY, Array.from(tools).join(","));
      }
    }
  } catch (err) {
    console.warn("[dev-flags] could not persist URL flags to localStorage:", err);
  }
}

function parseToolsList(raw: string): Set<string> {
  return new Set(
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  );
}
