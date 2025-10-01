import { useEffect, useRef, useCallback } from "react";
import { signOut } from "next-auth/react";

interface UseInactivityTimeoutOptions {
  timeout?: number; // timeout in milliseconds
  warningTime?: number; // warning time in milliseconds before timeout
  onTimeout?: () => void;
  onWarning?: () => void;
}

export function useInactivityTimeout({
  timeout = 30 * 60 * 1000, // 30 minutes default
  warningTime = 5 * 60 * 1000, // 5 minutes warning default
  onTimeout,
  onWarning,
}: UseInactivityTimeoutOptions = {}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now();

    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    // Set warning timeout
    warningRef.current = setTimeout(() => {
      if (onWarning) {
        onWarning();
      }
    }, timeout - warningTime);

    // Set final timeout
    timeoutRef.current = setTimeout(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;

      // Only logout if we haven't had activity for the full timeout period
      if (timeSinceLastActivity >= timeout) {
        if (onTimeout) {
          onTimeout();
        } else {
          // Default behavior: sign out
          signOut({ callbackUrl: "/admin" });
        }
      }
    }, timeout);
  }, [timeout, warningTime, onTimeout, onWarning]);

  const handleActivity = useCallback(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;

    // Only reset if we've had some meaningful inactivity (at least 1 second)
    if (timeSinceLastActivity >= 1000) {
      resetTimeout();
    }
  }, [resetTimeout]);

  useEffect(() => {
    // Set up event listeners for user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initial timeout setup
    resetTimeout();

    // Cleanup function
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }
    };
  }, [handleActivity, resetTimeout]);

  return {
    resetTimeout,
    lastActivity: lastActivityRef.current,
  };
}
