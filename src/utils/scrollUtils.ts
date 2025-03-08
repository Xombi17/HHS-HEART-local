import { scroller } from 'react-scroll';

/**
 * Smoothly scrolls to the specified element
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from the top of the element (default: -80 to account for navbar)
 * @param duration - Duration of the scroll animation in ms (default: 800)
 */
export const scrollToElement = (elementId: string, offset: number = -80, duration: number = 800): void => {
  scroller.scrollTo(elementId, {
    duration,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset,
  });
};

/**
 * Smoothly scrolls to the top of the page
 * @param duration - Duration of the scroll animation in ms (default: 800)
 */
export const scrollToTop = (duration: number = 800): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}; 