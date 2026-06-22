import { useEffect, useState } from "react";

type DiscoveryItem = {
  title: string;
  description: string;
  url: string;
  featured: boolean;
};

type Props = {
  items: DiscoveryItem[];
};

type DiscoveryMode = "latest" | "featured";

const modes: Array<{ key: DiscoveryMode; label: string }> = [
  { key: "latest", label: "Latest" },
  { key: "featured", label: "Featured" }
];

export default function HomeDiscoveryIsland({ items }: Props) {
  const [mode, setMode] = useState<DiscoveryMode>("latest");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const visibleItems = (mode === "featured" ? items.filter((item) => item.featured) : items).slice(0, 5);

  return (
    <div className="home-discovery-island">
      <div className="island-controls" aria-label="Discovery view">
        {modes.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={mode === item.key}
            disabled={!isHydrated}
            onClick={() => setMode(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {isHydrated ? (
        visibleItems.length > 0 ? (
          <div className="island-list">
            {visibleItems.map((item) => (
              <article className="island-card" key={item.url}>
                <h3>
                  <a href={item.url}>{item.title}</a>
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="island-empty">No featured writing is available yet.</p>
        )
      ) : (
        <p className="island-fallback">Interactive discovery loads when JavaScript is available.</p>
      )}

      <style>{`
        .home-discovery-island {
          margin-top: 20px;
        }

        .island-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
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

        .island-card p,
        .island-fallback,
        .island-empty {
          margin: 0;
          color: var(--color-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
