export const SCROLL_CONFIG = {
    // Multiplier used to compute virtual scroll height (body height factor)
    bodyHeightFactor: 2,
    // Factor to convert scrollY into progress denominator (maxScrollDistance = innerHeight * maxScrollFactor)
    maxScrollFactor: 1.5,
    // When skill/experience sections start becoming visible
    sectionsStart: 0.2,
    // When skill/experience sections are fully revealed
    sectionsFull: 0.6,
};

export const progressToScrollY = (progress: number, viewportHeight: number) => {
    const maxScrollDistance = viewportHeight * SCROLL_CONFIG.maxScrollFactor;
    return Math.min(Math.max(progress, 0), 1) * maxScrollDistance;
};
