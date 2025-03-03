'use client';

import { SearchProvider } from "@/context/SearchContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SidebarRight from "@/components/SidebarRight";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Pages that don't show any sidebars
const pagesWithoutSidebars = [
  '/login',
  '/signup',
];

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isHomePage = pathname === '/';
  const hideSidebars = pagesWithoutSidebars.some(path => pathname?.startsWith(path));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  if (hideSidebars) {
    return (
      <SearchProvider>
        <div className="min-h-screen bg-gray-50">
          <Header showMobileMenu={false} />
          <main>{children}</main>
        </div>
      </SearchProvider>
    );
  }

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          showMobileMenu={true}
          sidebarOpen={sidebarOpen}
          onSidebarOpenChange={setSidebarOpen}
        />
        
        <div className="max-w-8xl mx-auto px-4 pt-6">
          <div className="flex gap-6 relative">
            {/* Left Sidebar - always visible except on auth pages */}
            <>
              {/* Desktop sidebar */}
              <div className="hidden lg:block w-64 shrink-0">
                <Sidebar />
              </div>

              {/* Mobile sidebar */}
              <>
                {/* Backdrop */}
                {sidebarOpen && (
                  <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}
                
                {/* Sidebar */}
                <div
                  className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  } transition-transform duration-200 ease-in-out`}
                >
                  <Sidebar />
                </div>
              </>
            </>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>

            {/* Right sidebar - only shown on homepage */}
            {isHomePage && (
              <div className="hidden lg:block w-80 shrink-0">
                <SidebarRight />
              </div>
            )}
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}