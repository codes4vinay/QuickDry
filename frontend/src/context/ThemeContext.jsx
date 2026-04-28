import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("laundrypro_theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("laundrypro_theme", dark ? "dark" : "light");
  }, [dark]);

  const value = useMemo(() => ({ dark, toggleTheme: () => setDark((current) => !current) }), [dark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
