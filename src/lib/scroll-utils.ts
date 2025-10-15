/**
 * Utility functions for managing scroll behavior in the application
 */

/**
 * Scrolls to the projects section with smooth animation
 * @param options - Custom scroll options
 */
export const scrollToProjectsSection = (options?: ScrollIntoViewOptions) => {
  const projectsSection = document.getElementById("projects-section");
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      ...options,
    });
  }
};

/**
 * Scrolls to any element by ID with smooth animation
 * @param elementId - The ID of the element to scroll to
 * @param options - Custom scroll options
 */
export const scrollToElement = (
  elementId: string,
  options?: ScrollIntoViewOptions
) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      ...options,
    });
  }
};

/**
 * Debounced scroll function to prevent excessive scroll calls
 * @param scrollFunction - The scroll function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 */
export const debounceScroll = (
  scrollFunction: () => void,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(scrollFunction, delay);
  };
};

/**
 * Auto-scroll with animation frame for better performance
 * @param scrollFunction - The scroll function to execute
 * @param delay - Additional delay after animation frame (default: 150)
 */
export const autoScrollWithFrame = (
  scrollFunction: () => void,
  delay: number = 150
) => {
  requestAnimationFrame(() => {
    setTimeout(scrollFunction, delay);
  });
};
