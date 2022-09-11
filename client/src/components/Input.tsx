import React, { Dispatch, SetStateAction } from 'react';

interface InputType {
  onChange: Dispatch<SetStateAction<string>> | ((value: string) => void);
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Input({
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: InputType) {
  return (
    <input
      onChange={(e) => {
        onChange(e.target.value);
      }}
      type={type}
      placeholder={placeholder}
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 mb-3"
      required={required}
    />
  );
}

export default React.memo(Input);
