import Airdrop from "App/Header/Airdrop";
import { useEffect, useRef, useState } from "react";
import { Location, matchRoutes, useLocation } from "react-router-dom";
import APLogo from "components/APLogo";
import WalletSuite from "components/WalletSuite";
import { appRoutes } from "constants/routes";
import DesktopNav from "./DesktopNav";
import { Opener as MobileNavOpener } from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header({ classes = "" }: { classes?: string }) {
  const location = useLocation();
  const isScrolledRef = useRef<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const _isScrolled = window.scrollY > 0;
      if (_isScrolled !== isScrolledRef.current) {
        setIsScrolled(_isScrolled);
        isScrolledRef.current = _isScrolled;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bg =
    !hasBanner(location) || isScrolled ? "bg-blue dark:bg-blue-d3" : "";

  const mb = hasBanner(location) ? "-mb-[6.5rem]" : "mb-0";

  return (
    <header
      className={`${classes} ${isScrolled ? "shadow-lg" : ""} ${bg} ${mb}
      transition-shadow ease-in-out duration-300 w-full h-[90px]`}
    >
      <div className="grid items-center gap-4 padded-container grid-cols-[auto_1fr_auto] h-full">
        <APLogo className="w-32" />
        <DesktopNav classes="hidden lg:flex" />
        <div className="flex gap-4 justify-self-end">
          <ThemeToggle classes="hidden lg:flex" />
          <WalletSuite />
          <Airdrop />
        </div>
        <MobileNavOpener classes="flex ml-2 lg:hidden" />
      </div>
    </header>
  );
}

function hasBanner(location: Location): boolean {
  return !!matchRoutes(
    [
      /**routes with banner */
      appRoutes.index,
      appRoutes.gift + "/*",
      appRoutes.donate + "/:id",
      appRoutes.profile + "/:id",
    ].map((r) => ({ path: r })),
    location
  );
}
