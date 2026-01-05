
import React from 'react';

interface MenuButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export const MenuButtons: React.FC<MenuButtonsProps> = ({ options, onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full border border-indigo-200 text-indigo-700 text-sm font-medium transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50 active:bg-indigo-100'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
