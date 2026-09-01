"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as a React store.
 *
 * `useSyncExternalStore` is the right shape for this: the browser owns the
 * value, the server has no answer for it, and the component re-renders only
 * when the query actually flips. The server snapshot is `false`, so anything
 * gated on a query is absent from the HTML and appears after hydration —
 * which is exactly the behaviour wanted for pointer-only affordances.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
