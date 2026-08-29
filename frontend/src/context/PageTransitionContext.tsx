'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PageTransitionContextType {
  isTransitioning: boolean;
  progress: number;
  targetPath: string | null;
  startTransition: (href: string, title?: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  progress: 0,
  targetPath: null,
  startTransition: () => {},
});

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const prevPathnameRef = useRef(pathname);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname changes (route change completed), complete progress bar
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setProgress(100);
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setProgress(0);
        setTargetPath(null);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const startTransition = useCallback(
    (href: string, _title?: string) => {
      const targetClean = href.split('?')[0].split('#')[0];
      const currentClean = (pathname || '/').split('?')[0].split('#')[0];

      if (targetClean === currentClean && href === pathname) {
        return;
      }

      setTargetPath(href);
      setIsTransitioning(true);
      setProgress(35);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setProgress(85);
      }, 80);

      // Instant non-blocking route push
      router.push(href);
    },
    [pathname, router]
  );

  const contextValue = useMemo(
    () => ({
      isTransitioning,
      progress,
      targetPath,
      startTransition,
    }),
    [isTransitioning, progress, targetPath, startTransition]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {/* Sleek Top Glowing Progress Bar */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => useContext(PageTransitionContext);

/**
 * Drop-in link component that navigates immediately with smooth top progress
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
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (href.startsWith('/') && !href.startsWith('#')) {
      e.preventDefault();
      startTransition(href, targetTitle);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
};
