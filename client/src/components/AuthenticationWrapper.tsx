import React from 'react';

function AuthenticationWrapper({
  children,
}: {
  children: React.ReactElement[];
}) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-1/5 flex flex-col">{children}</div>
    </div>
  );
}
export default React.memo(AuthenticationWrapper);
