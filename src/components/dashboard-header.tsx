import { cn } from "@/lib/utils";
import * as React from "react";

export const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6",
        className
      )}
      {...props}
    />
  );
});
DashboardHeader.displayName = "DashboardHeader";
