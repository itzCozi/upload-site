import GitHubLogo from "@/assets/github_logo.svg";
import { NavLink } from "@/components/ui/nav-link";

export function Footer() {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 z-20 h-[56px] w-full shadow backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-8">
        <p className="text-sm font-semibold">© {new Date().getFullYear()} Bookracy</p>

        <div className="flex flex-row gap-2">
          <NavLink to="/">
            New
          </NavLink>
          ·
          <NavLink to="/about">
            About
          </NavLink>
          ·
          <NavLink to="/docs">
            Docs
          </NavLink>
        </div>

        <a target="_blank" href="https://github.com/upaste" rel="noreferrer" className="h-6 w-6 transition-transform duration-150 hover:scale-110">
          <img src={GitHubLogo} alt="Github" className="h-6 w-6 dark:invert" />
        </a>
      </div>
    </div>
  );
}
