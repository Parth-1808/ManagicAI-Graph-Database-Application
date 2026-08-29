'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Layers, 
  Sparkles, 
  GitFork,
  LogOut
} from 'lucide-react';
import { usePageTransition, TransitionLink } from '@/context/PageTransitionContext';

export const AppNavbar: React.FC = () => {
  const pathname = usePathname();
  const { isTransitioning, targetPath } = usePageTransition();

  const navItems = [
    { id: 'nav-home', label: 'Home', href: '/dashboard', icon: Home, title: 'Home Dashboard' },
    { id: 'nav-workspace', label: 'Workspace', href: '/workspace', icon: Layers, title: 'Workspace Hub' },
    { id: 'nav-insights', label: 'Insights', href: '/insights', icon: Sparkles, title: 'Intelligence & Insights' },
    { id: 'nav-graph', label: 'Graph', href: '/graph', icon: GitFork, title: 'Enterprise Graph Canvas' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-3 pb-2 pointer-events-none flex justify-center px-4">
      <div className="pointer-events-auto">
        <nav className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          
          {/* Brand */}
          <TransitionLink
            href="/dashboard"
            targetTitle="Home Dashboard"
            className="flex items-center gap-2 px-1.5 shrink-0 group"
          >
            <div className="h-8 w-8 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center bg-white/50 border border-purple-100/60 p-0.5">
              <img
                src="/logo.png"
                alt="ManagicAI Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900">
              ManagicAI
            </span>
          </TransitionLink>

          <div className="h-4 w-px bg-slate-200" />

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const cleanTargetPath = targetPath ? targetPath.split('?')[0].split('#')[0] : null;
              const isCurrentRoute = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
              const isTargetRoute = isTransitioning && cleanTargetPath === item.href;
              const isActive = isTransitioning ? isTargetRoute : isCurrentRoute;
              
              return (
                <TransitionLink
                  key={item.id}
                  href={item.href}
                  targetTitle={item.title}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </TransitionLink>
              );
            })}

            {/* Logout Icon linking to Landing Page */}
            <TransitionLink
              href="/"
              targetTitle="Landing Overview"
              title="Log Out to Landing Page"
              className="flex items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all ml-1 gap-1"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Logout</span>
            </TransitionLink>
          </div>

        </nav>
      </div>
    </header>
  );
};

