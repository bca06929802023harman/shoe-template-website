import { createContext, useContext, useState, type ReactNode } from "react";

export type ToonHubTheme = {
  id: string;
  background: string;
  soft: string;
  accent: string;
  ink: string;
};

export const TOONHUB_THEMES: ToonHubTheme[] = [
  {
    id: "orange",
    background: "#F4845F",
    soft: "#FDE3D8",
    accent: "#CC5535",
    ink: "#2B1B18",
  },
  {
    id: "green",
    background: "#6BBF7A",
    soft: "#DDF3E1",
    accent: "#2E8350",
    ink: "#153121",
  },
  {
    id: "pink",
    background: "#E882B4",
    soft: "#FBE0ED",
    accent: "#B84377",
    ink: "#351827",
  },
  {
    id: "blue",
    background: "#6EB5FF",
    soft: "#DDEEFF",
    accent: "#2876BE",
    ink: "#142B45",
  },
];

type ToonHubThemeContextValue = {
  theme: ToonHubTheme;
  setTheme: (theme: ToonHubTheme) => void;
};

const ToonHubThemeContext = createContext<ToonHubThemeContextValue | null>(null);

export function ToonHubThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ToonHubTheme>(TOONHUB_THEMES[0]!);

  return (
    <ToonHubThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ToonHubThemeContext.Provider>
  );
}

export function useToonHubTheme() {
  const context = useContext(ToonHubThemeContext);
  if (!context) {
    throw new Error("useToonHubTheme must be used within ToonHubThemeProvider");
  }
  return context;
}
