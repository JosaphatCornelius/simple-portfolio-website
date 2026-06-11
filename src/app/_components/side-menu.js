import Link from "next/link";
import { MENU_COLORS, MENU_OFFSETS, MENU_TILTS, MenuLabel } from "./p3r";

// Static variant of the home page's MenuNav for secondary pages: same look
// but plain links and no scroll-spy.
export function SideMenu({ items, activeLabel }) {
  return (
    <nav className="fly fly-menu fixed top-1/2 left-[27%] z-30 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li
            key={item.label}
            style={{
              marginLeft: MENU_OFFSETS[index],
              transform: `rotate(${MENU_TILTS[index]}deg)`,
            }}
          >
            <Link href={item.href} className="group relative block">
              <MenuLabel
                isActive={item.label === activeLabel}
                color={MENU_COLORS[index]}
              >
                {item.label}
              </MenuLabel>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
