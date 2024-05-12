import { classNames, useActivePath } from "@app/utils/helpers";
import { MENU_LINKS } from "@constants/nav";
import Link from "next/link";
import React from "react";

const Menu = () => {
  const checkActivePath = useActivePath();

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  return (
    <>
      {MENU_LINKS.map(({ label, href }) =>
        href === "/my-bookings" && userEmail === null ? (
          <React.Fragment key={label} />
        ) : (
          <Link
            key={label}
            href={href}
            className={classNames(
              checkActivePath(href)[0] &&
                "font-bold border-b-2 border-green-700"
            )}
          >
            {label}
          </Link>
        )
      )}
    </>
  );
};

export default Menu;
