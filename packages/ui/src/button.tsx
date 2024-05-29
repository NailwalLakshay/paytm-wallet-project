"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  OnClick? : ()=>void
}

export const Button = ({ children, className , OnClick}: ButtonProps) => {
  return (
    <button
      className={`${className}`}
      onClick={() => {
        if(OnClick) OnClick()
      }}
    >
      {children}
    </button>
  );
};
