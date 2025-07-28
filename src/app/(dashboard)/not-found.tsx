"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNotFound = () => {
  const pathname = usePathname();

  // Extract page name from pathname
  const getPageName = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    // Convert kebab-case or snake_case to Title Case
    return lastSegment
      ? lastSegment
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Page";
  };

  const pageName = getPageName(pathname);

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl max-w-2xl w-full">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300 dark:text-gray-600">
          404
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-gray-500 dark:text-gray-400 mt-4 text-center">
          {pageName} not found!
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-4 pb-4 border-b-2 border-gray-200 dark:border-gray-600 text-center max-w-md">
          The page you&apos;re looking for doesn&apos;t exist. You can navigate
          to other sections using the sidebar.
        </p>
        <div className="flex gap-4 mt-6">
          <Link
            href="/overview"
            className="flex items-center space-x-2 border border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 hover:border hover:border-blue-600 text-white px-4 py-2 rounded transition duration-150"
            title="Go to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Dashboard</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 border border-gray-400 bg-gray-400 hover:bg-white hover:text-gray-400 dark:hover:bg-gray-800 hover:border hover:border-gray-400 text-white px-4 py-2 rounded transition duration-150"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNotFound;
