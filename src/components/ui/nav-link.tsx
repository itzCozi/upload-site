import * as React from "react";
import { Link, RoutePaths } from "@tanstack/react-router";
import { ReactNode } from "react";
import { routeTree } from "@/routeTree.gen";

interface NavLinkProps {
  to: RoutePaths<typeof routeTree> | (string & {});
  className?: string;
  target?: string;
  children: ReactNode;
}

function isExternalLink(url: string): boolean {
  return /^(https?:)?\/\//.test(url);
}

export function NavLink({ to, className, target, children }: NavLinkProps) {
  if (isExternalLink(to)) {
    return (
      <a href={to} target={target} className={`text-blue-500 transition-colors duration-300 hover:underline ${className}`} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <div>
      <Link to={to} target={target} className={`text-blue-500 transition-colors duration-300 hover:underline ${className}`} rel="noreferrer">
        {children}
      </Link>
    </div>
  );
}