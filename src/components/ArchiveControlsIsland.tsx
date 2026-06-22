import { useEffect, useMemo, useState } from "react";

type ArchiveItem = {
  title: string;
  description: string;
  url: string;
  lang: "en" | "zh";
  category: string;
  date: string;
};

type Props = {
  items: ArchiveItem[];
  categories?: readonly string[];
  selectedCategory?: string;
};

type LanguageFilter = "all" | "en" | "zh";
type CategoryFilter = "all" | string;

const languageFilters: Array<{ key: LanguageFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "en", label: "English" },
  { key: "zh", label: "中文" }
];

function getLanguageLabel(lang: ArchiveItem["lang"]) {
  return lang === "zh" ? "中文" : "English";
}

export default function ArchiveControlsIsland({ items, categories, selectedCategory }: Props) {
  const [language, setLanguage] = useState<LanguageFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>(selectedCategory ?? "all");
  const [isHydrated, setIsHydrated] = useState(false);
  const categoryFilters = useMemo(
    () => categories ?? Array.from(new Set(items.map((item) => item.category))),
    [categories, items]
  );

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get("category");

    if (categoryParam && categoryFilters.includes(categoryParam)) {
      setCategory(categoryParam);
    }

    setIsHydrated(true);
  }, [categoryFilters]);

  const visibleItems = items.filter((item) => {
    const matchesLanguage = language === "all" || item.lang === language;
    const matchesCategory = category === "all" || item.category === category;

    return matchesLanguage && matchesCategory;
  });

  return (
    <div className="archive-controls-island">
      <div className="island-control-groups">
        <div className="island-controls" aria-label="Interactive language filter">
          {languageFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={language === item.key}
              disabled={!isHydrated}
              onClick={() => setLanguage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="island-controls" aria-label="Interactive category filter">
          <button
            type="button"
            aria-pressed={category === "all"}
            disabled={!isHydrated}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {categoryFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              disabled={!isHydrated}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isHydrated ? (
        visibleItems.length > 0 ? (
          <div className="island-list">
            {visibleItems.map((item) => (
              <article className="island-card" key={item.url}>
                <p className="island-meta">
                  {getLanguageLabel(item.lang)} &middot; {item.category}
                </p>
                <h3>
                  <a href={item.url}>{item.title}</a>
                </h3>
                <p className="island-description">{item.description}</p>
                <time dateTime={item.date}>{item.date}</time>
              </article>
            ))}
          </div>
        ) : (
          <p className="island-empty">No writing matches these filters.</p>
        )
      ) : (
        <p className="island-fallback">Interactive archive filters load when JavaScript is available.</p>
      )}

      <style>{`
        .archive-controls-island {
          margin-top: 20px;
        }

        .island-control-groups {
          display: grid;
          gap: 10px;
          margin-bottom: 12px;
        }

        .island-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .island-controls button {
          padding: 8px 12px;
          color: var(--color-ink);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 999px;
          cursor: pointer;
          font: inherit;
          font-weight: 700;
        }

        .island-controls button:disabled {
          cursor: default;
          opacity: 0.7;
        }

        .island-controls button[aria-pressed="true"] {
          color: var(--color-bg);
          background: var(--color-ink);
          border-color: var(--color-ink);
        }

        .island-list {
          border-top: 1px solid var(--color-border);
        }

        .island-card {
          padding: 18px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .island-card h3 {
          margin: 0 0 8px;
          font-size: clamp(1.15rem, 2vw, 1.55rem);
          line-height: 1.2;
        }

        .island-card p {
          margin: 0 0 10px;
        }

        .island-meta,
        .island-card time {
          color: var(--color-muted);
          font-size: 0.9rem;
        }

        .island-description,
        .island-fallback,
        .island-empty {
          color: var(--color-muted);
          line-height: 1.6;
        }

        .island-fallback,
        .island-empty {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
