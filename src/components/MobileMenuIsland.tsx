import { useState } from "react";

type ViewKey = "all" | "en" | "zh";

type Props = {
  links: Array<{ href: string; label: string }>;
  showContentView?: boolean;
  initialView: ViewKey;
  hrefs: Record<ViewKey, string>;
};

export default function MobileMenuIsland({ links, showContentView = true, initialView, hrefs }: Props) {
  const [open, setOpen] = useState(false);
  const views: Array<{ key: ViewKey; label: string }> = [
    { key: "all", label: "All" },
    { key: "en", label: "EN" },
    { key: "zh", label: "中文" }
  ];

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu__button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      <div id="mobile-menu-panel" className="mobile-menu__panel" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <form className="search-form" role="search" action="/search/" method="get">
          <label className="visually-hidden" htmlFor="mobile-site-search">Search</label>
          <input
            id="mobile-site-search"
            type="search"
            name="q"
            placeholder="Search"
            autoComplete="off"
          />
          <button type="submit" aria-label="Submit search">→</button>
        </form>
        {showContentView && (
          <div className="view-filter mobile-menu__view" data-view-filter>
            <p>View</p>
            <div>
              {views.map((view) => (
                <a
                  key={view.key}
                  href={hrefs[view.key]}
                  data-view={view.key}
                  aria-current={initialView === view.key ? "true" : undefined}
                >
                  {view.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
