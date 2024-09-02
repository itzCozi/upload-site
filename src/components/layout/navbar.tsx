import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useLayout } from "@/hooks/use-layout";
import { useLayoutStore } from "@/stores/layout";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { pageTitle } = useLayout();
  const setPageTitle = useLayoutStore((state) => state.page.setTitle);

  useEffect(() => {
    if (pageTitle) setPageTitle(pageTitle);
  }, [pageTitle, setPageTitle]);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary sticky top-0 z-10 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <Link to="/" className="flex flex-row gap-1 items-center">
          <img src="src/assets/icon.png" alt="files.vc icon" className="h-10" />
          <h1 className="font-bold text-3xl">files.vc</h1>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
