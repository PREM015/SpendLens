"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  className,
  containerClassName,
  borderClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}) => {
  return (
    <div className={cn("p-[1px] relative", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500",
          borderClassName
        )}
      />
      <div className={cn("relative bg-white dark:bg-black rounded-xl", className)}>
        {children}
      </div>
    </div>
  );
};
