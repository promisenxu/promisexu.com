import { useState } from "react";

type Props = {
  links: Array<{ href: string; label: string }>;
  showContentView?: boolean;
};

const views = [
  { key: "all", label: "All", href: "/" },
  { key: "en", label: "EN", href: "/en/writing/" },
  { key: "zh", label: "中文", href: "/zh/writing/" }
];

export default function MobileMenuIsland({ links, showContentView = true }: Props) {
  const [open, setOpen] = useState(false);

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
          <label htmlFor="mobile-site-search">Search</label>
          <input
            id="mobile-site-search"
            type="search"
            name="q"
            placeholder="Search"
            autoComplete="off"
          />
        </form>
        {showContentView && (
          <div className="view-filter mobile-menu__view" data-view-filter>
            <p>View</p>
            <div>
              {views.map((view) => (
                <a key={view.key} href={view.href} data-view={view.key}>
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
