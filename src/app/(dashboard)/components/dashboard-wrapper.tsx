// src/app/(dashboard)/components/dashboard-wrapper.tsx
"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Add this import if using next-themes
import { LogOut, PanelLeftOpen, PanelRightOpen } from "lucide-react";
import Lordicon from "@/components/lordicon/lordicon-wrapper";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const pathname = usePathname();
  const { theme } = useTheme(); // Add this if using next-themes
  const [open, setOpen] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(220);
  const [isResizing, setIsResizing] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [startWidth, setStartWidth] = React.useState(0);
  const [, setUserResizedWidth] = React.useState<number | null>(null);
  const [manualToggle, setManualToggle] = React.useState(false);

  const minWidth = 72;
  const maxWidth = 400;

  // Define color schemes
  const getIconColors = (isActive: boolean, isDark: boolean) => {
    if (isActive) {
      return {
        primary: isDark ? "#FFFF00" : "#4dba28",
        secondary: isDark ? "#FFFF00" : "#4dba28",
      };
    }
    return {
      primary: isDark ? "#FFFF00" : "#4dba28",
      secondary: isDark ? "#FFFF00" : "#4dba28",
    };
  };

  const links = [
    {
      label: "Overview",
      href: "/overview",
      iconSrc: "https://cdn.lordicon.com/jeuxydnh.json",
    },
    {
      label: "Users",
      href: "/manage-user",
      iconSrc: "https://cdn.lordicon.com/fqbvgezn.json",
    },
    {
      label: "Manage Post",
      href: "/manage-post",
      iconSrc: "https://cdn.lordicon.com/ldyubhgs.json",
    },
    {
      label: "Manage Categories",
      href: "/manage-categories",
      iconSrc: "https://cdn.lordicon.com/dutqakce.json",
    },
    {
      label: "Subscription",
      href: "/subscription",
      iconSrc: "https://cdn.lordicon.com/bktacmnd.json",
    },
    {
      label: "Manage Ads",
      href: "/manage-ads",
      iconSrc: "https://cdn.lordicon.com/xovdoewm.json",
    },
    {
      label: "Settings",
      href: "/settings",
      iconSrc: "https://cdn.lordicon.com/asyunleq.json",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, minWidth),
        maxWidth
      );

      setSidebarWidth(newWidth);
      setUserResizedWidth(newWidth);

      if (newWidth <= minWidth + 20) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  React.useEffect(() => {
    if (!isResizing && manualToggle) {
      if (open) {
        setSidebarWidth(220);
        setUserResizedWidth(220);
      } else {
        setSidebarWidth(minWidth);
      }
      setManualToggle(false);
    }
  }, [open, isResizing, manualToggle, minWidth]);

  const handleToggleClick = () => {
    setManualToggle(true);
    setOpen(!open);
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-background dark:bg-primary-dark w-full flex-1 mx-auto",
        "h-screen overflow-hidden relative"
      )}
    >
      <div className='relative overflow-visible flex'>
        <Sidebar
          open={open}
          setOpen={setOpen}
          animate={true}
          width={sidebarWidth}
        >
          <SidebarBody
            className={cn(
              "justify-between gap-10 border-r border-gray-300",
              "bg-background text-foreground",
              "dark:bg-primary-dark dark:bg-primary/70"
            )}
          >
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              <div className='flex items-center justify-center h-14 mb-4'>
                <Logo open={open} />
              </div>

              <div className='flex flex-col  gap-4'>
                {links.map((link, idx) => {
                  const isActive = pathname === link.href;
                  const isDark = theme === "dark";

                  return (
                    <SidebarLink
                      key={idx}
                      link={{
                        ...link,
                        icon: (
                          <Lordicon
                            src={link.iconSrc}
                            trigger='hover'
                            stroke={3}
                            colors={getIconColors(isActive, isDark)}
                            size={24}
                          />
                        ),
                      }}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md transition-all duration-200 group",
                        isActive
                          ? "flex items-center bg-primary/30 dark:bg-primary text-foreground font-semibold shadow-md"
                          : "flex items-center text-black/80 hover:text-black hover:font-medium hover:bg-primary/15 dark:hover:bg-primary/40"
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <div className='border-t border-gray-300'>
              <div className='my-1'>
                <SidebarLink
                  link={{
                    label: "Profile",
                    href: "/profile",
                    icon: (
                      <Lordicon
                        src='https://cdn.lordicon.com/hrjifpbq.json'
                        trigger='hover'
                        colors={getIconColors(
                          pathname === "/profile",
                          theme === "dark"
                        )}
                        size={24}
                        stroke={3}
                      />
                    ),
                  }}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200",
                    pathname === "/profile"
                      ? "bg-primary/30 dark:bg-primary text-foreground font-semibold shadow-md"
                      : "text-black/80 hover:text-black hover:font-medium hover:bg-primary/15 dark:hover:bg-primary/40"
                  )}
                />
              </div>
              <button
                onClick={() => {
                  console.log("Logout clicked");
                }}
                className='w-full'
              >
                <div className='flex items-center gap-3 p-2 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200'>
                  <LogOut className='h-6 w-6 flex-shrink-0 stroke-2 text-red-400 hover:text-red-500' />
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className='text-sm whitespace-pre inline-block !p-0 !m-0'
                  >
                    Log Out
                  </motion.span>
                </div>
              </button>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Resizable Border */}
        <div
          className='hidden md:block w-1 bg-transparent cursor-col-resize hover:bg-blue-500/20 transition-colors duration-200 relative group'
          onMouseDown={handleMouseDown}
        >
          <div className='absolute inset-0 w-2 -ml-0.5 bg-transparent' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggleClick}
          className={cn(
            "absolute hidden md:flex top-4 z-[60] cursor-pointer p-2 rounded-full bg-white dark:bg-primary-dark border border-gray-300 dark:border-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
            open ? "-right-3" : "-right-3"
          )}
        >
          {open ? (
            <PanelRightOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          ) : (
            <PanelLeftOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          )}
        </button>
      </div>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Logo = ({ open }: { open: boolean }) => {
  return (
    <Link
      href='/overview'
      className='font-normal flex items-center text-sm relative z-20 w-full justify-center'
    >
      <motion.div
        animate={{
          width: open ? "128px" : "100px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className='flex items-center justify-center h-14 overflow-hidden'
      >
        <Image
          className='w-full h-full object-contain'
          alt='PrimeFlow Logo'
          src='/logo.png'
          width={open ? 128 : 100}
          height={80}
        />
      </motion.div>
    </Link>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1 bg-card min-h-0'>
      <div className='p-0 rounded-tl-2xl bg-white dark:bg-background flex flex-col gap-2 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-custom'>
        {children}
      </div>
    </div>
  );
};
