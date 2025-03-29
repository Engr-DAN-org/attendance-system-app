/**
 * execute a function with delay of 1.5 seconds
 */
export function withDelayAsync<T>(fn: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), 1500);
  });
}
