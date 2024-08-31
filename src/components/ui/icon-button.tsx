import * as React from "react";
import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer p-2 rounded-md hover:bg-background/90 dark:hover:bg-background/10 transition-colors duration-150"
    >
      {children}
    </button>
  );
}