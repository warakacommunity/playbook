import React, { useEffect, useState, useRef } from "react";
import styles from "./TableOfContentsNav.module.css";

/**
 * Extracts all headings (H2, H3) from the current document
 * Returns array of {id, level, text, element}
 */
function extractHeadings() {
  // Try multiple possible article containers
  let article = document.querySelector("article .markdown");
  if (!article) {
    article = document.querySelector("article");
  }
  if (!article) {
    article = document.querySelector("main");
  }
  if (!article) {
    return [];
  }

  const headings = [];
  const selector = "h2, h3";
  const elements = article.querySelectorAll(selector);

  elements.forEach((element) => {
    const level = parseInt(element.tagName[1]);
    // Use existing ID or generate one
    let id = element.id;
    if (!id) {
      id = generateId(element.textContent);
      element.id = id; // Set it so anchor links work
    }
    headings.push({
      id,
      level,
      text: element.textContent,
      element,
    });
  });

  return headings;
}

/**
 * Generates a simple ID from heading text if it doesn't have one
 */
function generateId(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
}

/**
 * Finds the current H2 section based on which one is in the viewport
 */
function findCurrentHeading(headings) {
  const h2Headings = headings.filter((h) => h.level === 2);
  if (h2Headings.length === 0) return -1;

  // Find which H2 heading is closest to the top of the viewport
  let closestIndex = 0;
  let closestDistance = Infinity;

  h2Headings.forEach((heading, idx) => {
    const rect = heading.element.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (rect.top <= window.innerHeight * 0.3 && distance < closestDistance) {
      closestDistance = distance;
      closestIndex = idx;
    }
  });

  return closestIndex;
}

/**
 * Shows only the current H2 section and its H3 subsections, hiding others
 */
function updateSectionVisibility(headings, currentSectionIndex) {
  const h2Headings = headings.filter((h) => h.level === 2);
  if (h2Headings.length === 0) return;

  const article = document.querySelector("article .markdown");
  if (!article) return;

  if (currentSectionIndex < 0 || currentSectionIndex >= h2Headings.length) return;

  const currentH2 = h2Headings[currentSectionIndex];
  const nextH2 = currentSectionIndex < h2Headings.length - 1 ? h2Headings[currentSectionIndex + 1] : null;
  const currentH2Index = Array.from(article.children).indexOf(currentH2.element);
  const nextH2Index = nextH2 ? Array.from(article.children).indexOf(nextH2.element) : article.children.length;

  // Hide all children
  Array.from(article.children).forEach((el, idx) => {
    if (idx >= currentH2Index && idx < nextH2Index) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
}

/**
 * Calculates progress through H2 sections
 */
function calculateProgress(headings, currentSectionIndex) {
  const h2Headings = headings.filter((h) => h.level === 2);
  if (h2Headings.length === 0) return 0;

  if (currentSectionIndex < 0) return 0;
  if (currentSectionIndex >= h2Headings.length) return 100;

  const progress = ((currentSectionIndex + 1) / h2Headings.length) * 100;
  return Math.round(progress);
}

export default function TableOfContentsNav() {
  const [headings, setHeadings] = useState([]);
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const extractionAttempts = useRef(0);

  // Handle navigation by jumping to specific section
  const handleNavigation = (headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      // Scroll to the element
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Find the index of this heading in h2Headings
      const h2Headings = headings.filter((h) => h.level === 2);
      const targetIndex = h2Headings.findIndex((h) => h.id === headingId);

      if (targetIndex !== -1) {
        // Directly update visibility for this section
        updateSectionVisibility(headings, targetIndex);
        setCurrentHeadingIndex(targetIndex);
        setProgress(calculateProgress(headings, targetIndex));
      }
    }
  };

  // Extract headings on mount and when content changes
  useEffect(() => {
    const extractHeadingsWithRetry = () => {
      const extracted = extractHeadings();

      // If no headings found, retry a few times (page might still be rendering)
      if (extracted.length === 0 && extractionAttempts.current < 5) {
        extractionAttempts.current += 1;
        setTimeout(extractHeadingsWithRetry, 300);
        return;
      }

      setHeadings(extracted);
      const currentIdx = findCurrentHeading(extracted);
      setCurrentHeadingIndex(currentIdx);
      setProgress(calculateProgress(extracted, currentIdx));
      updateSectionVisibility(extracted, currentIdx);
    };

    // Start extraction after a short delay to let the DOM settle
    const timer = setTimeout(extractHeadingsWithRetry, 200);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll to update current heading and progress
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const currentIdx = findCurrentHeading(headings);
      setCurrentHeadingIndex(currentIdx);
      setProgress(calculateProgress(headings, currentIdx));
      updateSectionVisibility(headings, currentIdx);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Get only H2 headings for section navigation
  const h2Headings = headings.filter((h) => h.level === 2);

  // Get adjacent sections for button links
  const hasPrev = currentHeadingIndex > 0;
  const hasNext = currentHeadingIndex < h2Headings.length - 1;
  const prevSection = hasPrev ? h2Headings[currentHeadingIndex - 1] : null;
  const nextSection = hasNext ? h2Headings[currentHeadingIndex + 1] : null;

  // Only render if we have H2 sections
  if (h2Headings.length === 0) return null;

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        <span className={styles.progressText}>{progress}%</span>
      </div>

      {/* Navigation Sections */}
      <div className={styles.navigation}>
        {/* Previous Button */}
        <div className={styles.buttonSection}>
          {hasPrev ? (
            <button
              onClick={() => handleNavigation(prevSection.id)}
              className={`${styles.navButton} ${styles.prevButton}`}
              title={`Go to: ${prevSection.text}`}
              type="button"
            >
              ← Previous
            </button>
          ) : (
            <div className={`${styles.navButton} ${styles.disabled}`}>← Previous</div>
          )}
        </div>

        {/* Current Section Info */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Current Section</div>
          <div className={styles.currentHeading}>
            {currentHeadingIndex >= 0 && currentHeadingIndex < h2Headings.length ? (
              <>
                <span className={styles.sectionCounter}>
                  {currentHeadingIndex + 1} / {h2Headings.length}
                </span>
                <span className={styles.level2}>{h2Headings[currentHeadingIndex].text}</span>
              </>
            ) : (
              <span className={styles.empty}>Top of page</span>
            )}
          </div>
        </div>

        {/* Next Button */}
        <div className={styles.buttonSection}>
          {hasNext ? (
            <button
              onClick={() => handleNavigation(nextSection.id)}
              className={`${styles.navButton} ${styles.nextButton}`}
              title={`Go to: ${nextSection.text}`}
              type="button"
            >
              Next →
            </button>
          ) : (
            <div className={`${styles.navButton} ${styles.disabled}`}>Next →</div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />
    </div>
  );
}
