import React from 'react';

function Wrapper({ children }: any) {
  return <div className="container mx-auto my-auto h-screen">{children}</div>;
}

export default Wrapper;
