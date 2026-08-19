"use client";

import { createContext, useContext } from "react";
import { getContent } from "./getContent";
import type { Content, Locale } from "./content.types";

const ContentContext = createContext<Content | null>(null);

export function ContentProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={getContent(locale)}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
