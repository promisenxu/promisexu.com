import { useEffect, useState } from "react";

type ViewKey = "all" | "en" | "zh";

const storageKey = "promisexu.contentView";
const views: Array<{ key: ViewKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" }
];

function applyView(view: ViewKey) {
  document.documentElement.dataset.contentView = view;
}

export default function ContentViewFilterIsland() {
  const [view, setView] = useState<ViewKey>("all");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const next = saved === "en" || saved === "zh" || saved === "all" ? saved : "all";
    setView(next);
    applyView(next);
  }, []);

  function choose(next: ViewKey) {
    setView(next);
    window.localStorage.setItem(storageKey, next);
    applyView(next);
  }

  return (
    <div className="view-filter" data-view-filter>
      <p>View</p>
      <div>
        {views.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={view === item.key}
            onClick={() => choose(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
