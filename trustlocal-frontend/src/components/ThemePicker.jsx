import React from 'react';

const THEME_COLORS = [
  { name: 'Purple', hex: '#aa3bff' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Orange', hex: '#f59e0b' },
  { name: 'Red', hex: '#ef4444' }
];

const ThemePicker = () => {
  const changeColor = (color) => {
    // Ye line poori website ka primary color badal degi
    document.documentElement.style.setProperty('--brand-primary', color);
  };

  return (
    <div className="flex gap-2 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700">
      {THEME_COLORS.map((c) => (
        <button
          key={c.name}
          onClick={() => changeColor(c.hex)}
          className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-125 transition-transform"
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </div>
  );
};

export default ThemePicker;