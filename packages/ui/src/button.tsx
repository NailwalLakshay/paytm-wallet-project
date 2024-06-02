"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  OnClick? : ()=>void,
  disabled?: boolean
}

export const Button = ({ children, className , OnClick , disabled}: ButtonProps) => {
  return (
    <button disabled={disabled}
      className={`${className} ${disabled ? "bg-gray-300 cursor-not-allowed" : "cursor-pointer" }`}
      onClick={() => {
        if(OnClick) OnClick()
      }}
    >
      {children}
    </button>
  );
};
