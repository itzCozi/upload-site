import { NavLink } from "@/components/ui/nav-link";

export function Footer() {
  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary z-20 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <p className="text-sm font-semibold">{new Date().getFullYear()} - files.vc</p>

        <div className="flex flex-row gap-2">
          <NavLink to="/">
            New
          </NavLink>
          ·
          <NavLink to="/about">
            About
          </NavLink>
          ·
          <NavLink to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
