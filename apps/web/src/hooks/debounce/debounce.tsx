"use client";
import { useCallback, useRef } from "react";

export type UseDebounceProps<T> = {
  callback: (arg: T, cancelTimeout: () => void) => void;
  debounce?: number;
  outsideCallback?: (arg: T, cancelTimeout: () => void) => void;
};

export const useDebounce = <T,>({
  callback,
  debounce = 300,
  outsideCallback,
}: UseDebounceProps<T>) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const cancelTimeout = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  const debounceCallback = useCallback(
    (arg: T) => {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        callback(arg, cancelTimeout);
      }, debounce);

      outsideCallback?.(arg, cancelTimeout);
    },
    [callback, cancelTimeout, debounce, outsideCallback],
  );

  return { cancelTimeout, debounceCallback };
};
