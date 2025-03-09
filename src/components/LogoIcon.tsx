import { useEffect, useState } from "react";

export default function LogoIcon() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);

    // Initial check
    handleChange();

    // Listen for changes in the color scheme
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {isDarkMode ? (
        <span className="icon-">insert_chart_outlined</span>
      ) : (
        <span className="icon-">insert_chart</span>
      )}
    </>
  );
}
