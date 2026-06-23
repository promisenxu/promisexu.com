import { useEffect } from "react";

type ViewKey = "all" | "en" | "zh";

const storageKey = "promisexu.contentView";
const viewKeys: ViewKey[] = ["all", "en", "zh"];

function isViewKey(value: unknown): value is ViewKey {
  return value === "all" || value === "en" || value === "zh";
}

function readSavedView() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return isViewKey(saved) ? saved : "all";
  } catch {
    return "all";
  }
}

function saveView(view: ViewKey) {
  try {
    window.localStorage.setItem(storageKey, view);
  } catch {
    // Preference persistence is optional; filtering should still work.
  }
}

function applyView(view: ViewKey) {
  document.documentElement.dataset.contentView = view;
  for (const key of viewKeys) {
    document.querySelectorAll<HTMLElement>(`[data-view="${key}"]`).forEach((element) => {
      if (key === view) {
        element.setAttribute("aria-current", "true");
      } else {
        element.removeAttribute("aria-current");
      }
    });
  }
}

export default function ContentViewFilterIsland() {
  useEffect(() => {
    applyView(readSavedView());

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-view-filter] [data-view]"));
    const cleanups = links.map((link) => {
      const listener = (event: MouseEvent) => {
        const next = link.dataset.view;

        if (!isViewKey(next)) {
          return;
        }

        event.preventDefault();
        saveView(next);
        applyView(next);
      };

      link.addEventListener("click", listener);
      return () => link.removeEventListener("click", listener);
    });

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, []);

  return null;
}
