import React from 'react';

interface ButtonType {
  children: React.ReactElement | string;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonType): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="text-white text-sm bg-blue-500 rounded-lg text-center py-2.5 px-5"
    >
      {children}
    </button>
  );
}

export default React.memo(Button);
