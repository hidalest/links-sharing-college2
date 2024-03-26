import React, { useEffect, useState } from "react";
import styles from "./SVGWrapper.module.scss";

interface SVGWrapperProps {
  markup: RequestInfo | URL;
  color: string;
  className?: string;
}
export const SVGWrapper = ({ markup, color, className }: SVGWrapperProps) => {
  const [svgMarkup, setSVGMarkup] = useState<string>("");
  useEffect(() => {
    // Fetch the SVG file content
    fetch(markup)
      .then((response) => response.text())
      .then((data) => setSVGMarkup(data))
      .catch((error) => console.error("Error fetching SVG:", error));
  }, [markup]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
      style={{ color }}
      role="img"
      className={`${styles.icon} ${className}`}
    />
  );
};
