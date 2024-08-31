import { useEffect } from "react";
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
        <div className="flex items-center space-x-4 lg:space-x-0">
          <h2 className="text-muted-foreground">{pageTitle ?? "Index"}</h2>
        </div>
        <h1 className="font-bold absolute left-1/2 transform -translate-x-1/2 text-2xl">Upaste</h1>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
