"use client";

import { signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  fxn?: string;
}

export const Button = ({ children, className , fxn}: ButtonProps) => {
  return (
    <button
      className={`${className}`}
      onClick={async () => {
        if(fxn === "signin") await signIn();
        else if(fxn === "logout") await signOut();
      }}
    >
      {children}
    </button>
  );
};
