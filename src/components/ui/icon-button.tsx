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
      className="cursor-pointer rounded-md hover:scale-105 transition-colors duration-150"
    >
      {children}
    </button>
  );
}