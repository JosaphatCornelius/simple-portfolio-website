import Link from "next/link";
import { MENU_COLORS, MENU_OFFSETS, MENU_TILTS } from "./p3r";

// Static variant of the home page's MenuNav for secondary pages: same look
// (staggered, tilted, skewed entries with the torn slash behind the active
// one) but plain links and no scroll-spy.
export function SideMenu({ items, activeLabel }) {
  return (
    <nav className="fly fly-menu fixed top-1/2 left-[27%] z-30 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => {
          const isActive = item.label === activeLabel;
          return (
            <li
              key={item.label}
              style={{
                marginLeft: MENU_OFFSETS[index],
                transform: `rotate(${MENU_TILTS[index]}deg)`,
              }}
            >
              <Link href={item.href} className="group relative block">
                {isActive && (
                  <>
                    <span className="absolute -inset-x-8 inset-y-1 -rotate-2 bg-[#ff6ea8] [clip-path:polygon(4%_18%,100%_0,94%_88%,0_100%)]" />
                    <span className="absolute -inset-x-7 inset-y-1 -rotate-2 bg-white [clip-path:polygon(3%_15%,100%_2%,95%_85%,0_98%)]" />
                  </>
                )}
                <span
                  className="font-display relative block skew-x-[-12deg] text-5xl tracking-wide transition-all duration-150 group-hover:translate-x-2 xl:text-6xl"
                  style={{
                    color: isActive ? "#e60012" : MENU_COLORS[index],
                    textShadow: isActive
                      ? "3px 3px 0 rgba(120,0,10,0.35)"
                      : "3px 4px 0 rgba(3,18,110,0.45)",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
