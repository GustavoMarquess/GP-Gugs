import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen  items-center justify-center bg-bgColor">
      {children}
    </div>
  );
};

export default Layout;
