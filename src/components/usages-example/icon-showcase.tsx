"use client";

import Lordicon from "../lordicon/lordicon-wrapper";

export default function IconShowcase() {
  const icons = [
    {
      src: "https://cdn.lordicon.com/jgnvfzqg.json",
      name: "Home",
      trigger: "click" as const,
      colors: { primary: "#4dba28", secondary: "#1e40af" },
      stroke: 2.5,
    },
    {
      src: "https://cdn.lordicon.com/jmkrnisz.json",
      name: "Delete",
      trigger: "loop" as const,
      colors: { primary: "#4dba28", secondary: "#059669" },
      stroke: 1.5,
    },
    {
      src: "https://cdn.lordicon.com/ndydpcaq.json",
      name: "Notification",
      trigger: "hover" as const,
      colors: { primary: "#4dba28", secondary: "#dc2626" },
      stroke: 2.2,
    },
    {
      src: "https://cdn.lordicon.com/lzsupfwm.json",
      name: "File",
      trigger: "hover" as const,
      colors: { primary: "#4dba28", secondary: "#4ecdc4" },
      stroke: 2,
    },
    {
      src: "https://cdn.lordicon.com/asyunleq.json",
      name: "Settings",
      trigger: "morph" as const,
      colors: { primary: "#4dba28", secondary: "#d97706" },
      stroke: 2,
    },
    {
      src: "https://cdn.lordicon.com/oqdmuxru.json",
      name: "Check",
      trigger: "loop-on-hover" as const,
      colors: { primary: "#4dba28", secondary: "#7c3aed" },
      stroke: 1.8,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Lordicon Integration Showcase
        </h2>
        <p className="text-lg text-gray-600">
          Interactive animated icons with various triggers and animations
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-full">
              <Lordicon
                src={icon.src}
                trigger={icon.trigger}
                colors={icon.colors}
                stroke={icon.stroke}
                size={48}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {icon.name}
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {icon.trigger}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Usage Examples
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Lordicon
              src="https://cdn.lordicon.com/oqdmuxru.json"
              trigger="hover"
              colors={{ primary: "#3b82f6" }}
              stroke={2}
              size={24}
            />
            <span>Hover over icons to see smooth animations</span>
          </div>
          <div className="flex items-center gap-3">
            <Lordicon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="click"
              colors={{ primary: "#10b981" }}
              stroke={2.5}
              size={24}
            />
            <span>Click icons for interactive feedback</span>
          </div>
          <div className="flex items-center gap-3">
            <Lordicon
              src="https://cdn.lordicon.com/tdrtiskw.json"
              trigger="loop"
              colors={{ primary: "#f59e0b" }}
              stroke={1.5}
              size={24}
            />
            <span>Continuous loop animations for attention</span>
          </div>
          <div className="flex items-center gap-3">
            <Lordicon
              src="https://cdn.lordicon.com/nocovwne.json"
              trigger="hover"
              colors={{ primary: "#8b5cf6", secondary: "#7c3aed" }}
              stroke={3}
              size={24}
            />
            <span>Customizable stroke width and colors</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Easy Color & Stroke Customization
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Color Examples:</h5>
            <div className="flex items-center gap-4">
              <Lordicon
                src="https://cdn.lordicon.com/msoeawqm.json"
                trigger="hover"
                colors={{ primary: "#ff0000", secondary: "#00ff00" }}
                size={32}
              />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                colors=&#123;&#123; primary: &ldquo;#ff0000&ldquo;, secondary:
                &ldquo;#00ff00&ldquo; &#125;&#125;
              </code>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Stroke Examples:</h5>
            <div className="flex items-center gap-4">
              <Lordicon
                src="https://cdn.lordicon.com/nocovwne.json"
                trigger="hover"
                colors={{ primary: "#3b82f6" }}
                stroke={4}
                size={32}
              />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                stroke=&#123;4&#125;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
