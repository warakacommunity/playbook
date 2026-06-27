// Coordinates the custom navbar dropdowns so only one is open at a time.
// Opening one immediately closes the others, so they never overlap during the
// 150ms mouse-leave grace period when sliding between nav items.
const closers = new Set();

export function registerDropdown(close) {
  closers.add(close);
  return () => closers.delete(close);
}

export function openExclusive(self) {
  closers.forEach((close) => {
    if (close !== self) close();
  });
}
