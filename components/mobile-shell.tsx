"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

export function MobileShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <div className="flex min-h-screen">
      <div className="hairline-b bg-bg-base fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          className="hairline flex h-9 w-9 items-center justify-center rounded-sm bg-bg-subtle text-fg-primary hover:bg-bg-muted"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-muted">
            Operator Portfolio
          </div>
          <div className="font-serif text-sm font-medium text-fg-primary leading-tight">
            90-Day Plan
          </div>
        </div>
        <div className="w-9" aria-hidden="true" />
      </div>

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
