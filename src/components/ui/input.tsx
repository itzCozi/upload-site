import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", iconLeft, iconRight, ...props }, ref) => {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileInfo({ name: file.name, size: file.size });
    } else {
      setFileInfo(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {iconLeft && <div className="absolute left-3 text-muted">{iconLeft}</div>}
      {iconRight && <div className="absolute right-3 text-muted">{iconRight}</div>}
      {type === "file" ? (
        <div className="relative w-full">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={ref}
            onChange={handleFileChange}
            {...props}
          />
          <button
            type="button"
            className={cn("flex flex-row gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-custom-color ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover",
              iconLeft && "pl-12",
              className,
            )}
          >
            Choose File
            {fileInfo && (
              <div className="text-sm text-muted-foreground">
                <p>{fileInfo.name} · {(fileInfo.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </button>
        </div>
      ) : (
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            iconLeft && "pl-12",
            className,
          )}
          ref={ref}
          {...props}
        />
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };