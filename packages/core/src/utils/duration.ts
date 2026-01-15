export function getAnimationDurationMs(element?: HTMLElement | null): number {
  if (!element) {
    return 0;
  }
  const styles = getComputedStyle(element);
  const duration = Number.parseFloat(styles.animationDuration || "0");

  return styles.animationDuration.endsWith("ms") ? duration : duration * 1000;
}
