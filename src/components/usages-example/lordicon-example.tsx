"use client";

import { useState } from "react";
import Lordicon from "@/components/lordicon/lordicon-wrapper";

export default function LordiconExample() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [iconColor, setIconColor] = useState("#4dba28"); // Set initial color

  // Function to change all icon colors
  const changeIconColor = (color: string) => {
    setIconColor(color);
  };

  return (
    <div className='p-8 space-y-8'>
      <h1 className='text-2xl font-bold mb-6'>Lordicon Examples</h1>

      {/* Color Picker Section */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Change All Icon Colors</h2>
        <div className='flex gap-4 items-center'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            onClick={() => changeIconColor("#4dba28")}
          >
            Green
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            onClick={() => changeIconColor("#f04438")}
          >
            Red
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            onClick={() => changeIconColor("#6941c6")}
          >
            Purple
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            onClick={() => changeIconColor("#f59e0b")}
          >
            Yellow
          </button>
        </div>
      </div>

      {/* Basic Usage */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Basic Icons</h2>
        <div className='flex gap-4 items-center'>
          <Lordicon
            src='/icons/computer.json'
            trigger='hover'
            size={48}
            colors={{
              primary: iconColor, // Use dynamic color here
            }}
          />
          <Lordicon
            src='https://cdn.lordicon.com/jgnvfzqg.json'
            trigger='click'
            size={48}
            colors={{
              primary: iconColor, // Use dynamic color here
              secondary: "#4dba28",
            }}
          />
          <Lordicon
            src='https://cdn.lordicon.com/wxnxiano.json'
            trigger='loop'
            size={48}
            colors={{
              primary: iconColor, // Use dynamic color here
            }}
          />
        </div>
      </div>

      {/* Different Triggers */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Different Triggers</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center'>
            <Lordicon
              src='/icons/h.svg'
              trigger='hover'
              size={64}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            <p className='text-sm mt-2'>Hover</p>
          </div>
          <div className='text-center'>
            <Lordicon
              src='/icons/settings.json'
              trigger='click'
              size={64}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            <p className='text-sm mt-2'>Click</p>
          </div>
          <div className='text-center'>
            <Lordicon
              src='https://cdn.lordicon.com/wxnxiano.json'
              trigger='loop'
              size={64}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            <p className='text-sm mt-2'>Loop</p>
          </div>
          <div className='text-center'>
            <Lordicon
              src='https://cdn.lordicon.com/lupuorrc.json'
              trigger='loop-on-hover'
              size={64}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            <p className='text-sm mt-2'>Loop on Hover</p>
          </div>
        </div>
      </div>

      {/* Colored Icons */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Custom Colors</h2>
        <div className='flex gap-4 items-center'>
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={64}
            colors={{
              primary: iconColor, // Use dynamic color here
              secondary: "#ffffff",
            }}
          />
          <Lordicon
            src='https://cdn.lordicon.com/jgnvfzqg.json'
            trigger='hover'
            size={64}
            colors={{
              primary: iconColor, // Use dynamic color here
              secondary: "#ffffff",
            }}
          />
          <Lordicon
            src='https://cdn.lordicon.com/wxnxiano.json'
            trigger='hover'
            size={64}
            colors={{
              primary: iconColor, // Use dynamic color here
              secondary: "#ffffff",
            }}
          />
        </div>
      </div>

      {/* In Buttons */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>In Buttons & Cards</h2>
        <div className='flex gap-4'>
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors'
            onClick={() => setIsAnimating(!isAnimating)}
          >
            <Lordicon
              src='https://cdn.lordicon.com/msoeawqm.json'
              trigger='click'
              size={24}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            Save Changes
          </button>

          <button className='bg-error text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-error/90 transition-colors'>
            <Lordicon
              src='https://cdn.lordicon.com/tdrtiskw.json'
              trigger='hover'
              size={24}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            Delete Item
          </button>

          <button className='bg-blue-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-dark/90 transition-colors'>
            <Lordicon
              src='https://cdn.lordicon.com/xjovhxra.json'
              trigger='loop-on-hover'
              size={24}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
            />
            Loading...
          </button>
        </div>
      </div>

      {/* In Cards */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>In Cards</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='colorado-card p-6 text-center'>
            <Lordicon
              src='https://cdn.lordicon.com/msoeawqm.json'
              trigger='hover'
              size={80}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
              className='mx-auto mb-4'
              stroke={3}
            />
            <h3 className='font-semibold mb-2'>Success</h3>
            <p className='text-sm text-muted-foreground'>
              Operation completed successfully
            </p>
          </div>

          <div className='colorado-card p-6 text-center'>
            <Lordicon
              src='https://cdn.lordicon.com/wxnxiano.json'
              trigger='hover'
              size={80}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
              className='mx-auto mb-4'
              stroke={3}
            />
            <h3 className='font-semibold mb-2'>Error</h3>
            <p className='text-sm text-muted-foreground'>
              Something went wrong
            </p>
          </div>

          <div className='colorado-card p-6 text-center'>
            <Lordicon
              src='https://cdn.lordicon.com/lupuorrc.json'
              trigger='loop'
              size={80}
              colors={{
                primary: iconColor, // Use dynamic color here
              }}
              className='mx-auto mb-4'
            />
            <h3 className='font-semibold mb-2'>Processing</h3>
            <p className='text-sm text-muted-foreground'>Please wait...</p>
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Different Sizes</h2>
        <div className='flex gap-4 items-end'>
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={24}
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={32}
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={48}
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={64}
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={96}
            colors={{ primary: iconColor }} // Use dynamic color here
          />
        </div>
      </div>

      {/* Custom Styling */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Custom Styling</h2>
        <div className='flex gap-4'>
          <Lordicon
            src='https://cdn.lordicon.com/msoeawqm.json'
            trigger='hover'
            size={64}
            className='border-2 border-primary rounded-full p-2'
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/jgnvfzqg.json'
            trigger='hover'
            size={64}
            className='bg-primary/10 rounded-lg p-2'
            colors={{ primary: iconColor }} // Use dynamic color here
          />
          <Lordicon
            src='https://cdn.lordicon.com/wxnxiano.json'
            trigger='hover'
            size={64}
            className='shadow-lg rounded-full p-2 bg-white'
            colors={{ primary: iconColor }} // Use dynamic color here
          />
        </div>
      </div>
    </div>
  );
}
