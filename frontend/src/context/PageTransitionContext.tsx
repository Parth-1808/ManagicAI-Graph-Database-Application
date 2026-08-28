'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PageTransitionContextType {
  isTransitioning: boolean;
  progress: number;
  targetPath: string | null;
  targetTitle: string;
  startTransition: (href: string, title?: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  progress: 0,
  targetPath: null,
  targetTitle: '',
  startTransition: () => {},
});

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Landing Overview',
  '/dashboard': 'Home Dashboard',
  '/workspace': 'Workspace Hub',
  '/insights': 'Intelligence & Insights',
  '/graph': 'Enterprise Graph Canvas',
};

const MIN_TRANSITION_MS = 280; // Crisp, responsive 280ms transition

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [targetTitle, setTargetTitle] = useState('');

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const activeTargetRef = useRef<string | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const cleanUpAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const startTransition = useCallback(
    (href: string, title?: string) => {
      // Clean target pathname
      const targetClean = href.split('?')[0].split('#')[0];
      const currentClean = (pathname || '/').split('?')[0].split('#')[0];

      // If already on the exact same page, no transition needed
      if (targetClean === currentClean && href === pathname) {
        return;
      }

      // Pre-warm route in Next.js router cache
      if (href.startsWith('/') && !href.startsWith('#')) {
        try {
          router.prefetch(href);
        } catch {
          // Ignore prefetch error
        }
      }

      // Determine human readable label
      const determinedTitle = title || ROUTE_TITLES[targetClean] || 'Page';

      cleanUpAnimation();

      setTargetPath(href);
      activeTargetRef.current = href;
      setTargetTitle(determinedTitle);
      setProgress(0);
      setIsTransitioning(true);

      const step = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const currentProgress = Math.min(100, (elapsed / MIN_TRANSITION_MS) * 100);

        setProgress(currentProgress);

        if (elapsed < MIN_TRANSITION_MS) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          // Reached 100%
          setProgress(100);

          const t1 = setTimeout(() => {
            if (activeTargetRef.current) {
              router.push(activeTargetRef.current);
            }

            const t2 = setTimeout(() => {
              setIsTransitioning(false);
              setProgress(0);
              setTargetPath(null);
              activeTargetRef.current = null;
            }, 60);
            timeoutsRef.current.push(t2);
          }, 40);
          timeoutsRef.current.push(t1);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [pathname, router, cleanUpAnimation]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanUpAnimation();
    };
  }, [cleanUpAnimation]);

  const contextValue = useMemo(
    () => ({
      isTransitioning,
      progress,
      targetPath,
      targetTitle,
      startTransition,
    }),
    [isTransitioning, progress, targetPath, targetTitle, startTransition]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => useContext(PageTransitionContext);

/**
 * Drop-in link component that invokes page transition with filler loading animation
 */
export interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  targetTitle?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  targetTitle,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const handleMouseEnter = () => {
    if (href.startsWith('/') && !href.startsWith('#')) {
      try {
        router.prefetch(href);
      } catch {
        // Ignore prefetch error
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If modifier keys pressed (Ctrl/Cmd/Shift for new tab), allow native behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    // Only intercept internal links
    if (href.startsWith('/') || href.startsWith('#')) {
      if (!href.startsWith('#')) {
        e.preventDefault();
        startTransition(href, targetTitle);
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
};
