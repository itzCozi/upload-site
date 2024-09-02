import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", iconLeft, iconRight, ...props }) => {
  const [fileInfo, setFileInfo] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const truncateFileName = (fileName: string): string => {
      const extension = fileName.split('.').pop();
      const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
      const maxLength = 12 - (extension?.length || 0);
      const truncatedName = nameWithoutExtension.slice(0, maxLength);
      return `${truncatedName}.${extension}`;
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileInfo(file);
      if (ref.current) {
        ref.current.files = e.dataTransfer.files;
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setFileInfo(file);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {iconLeft && <div className="absolute left-3 text-muted">{iconLeft}</div>}
      {iconRight && <div className="absolute right-3 text-muted">{iconRight}</div>}
      {type === "file" ? (
        <div
         className="relative w-full"
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
        >
         <input
           type="file"
           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
           ref={ref}
           onChange={handleFileChange}
           {...props}
         />
         {iconRight && <div className="absolute right-3 translate-y-[7px] text-muted-foreground">{iconRight}</div>}
         <button
           type="button"
           className={cn(`flex flex-row gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-custom-color ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover ${isDragging ? " transition-colors duration-300 border-dashed border-primary" : ""}`,
             iconLeft && "pl-12",
             className,
           )}
         >
           <div className="flex items-center">
              Choose File
              {fileInfo && (
                <div className="flex flex-row items-center">
                  <span className="mx-2 border-l-2 border-muted-foreground h-6 inline-block"></span>
                  <div className="text-sm text-muted-foreground">
                    <p>{fileInfo.name.length > 12 ? truncateFileName(fileInfo.name) : fileInfo.name} · {(fileInfo.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              )}
           </div>
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