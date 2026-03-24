import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, setTheme }) => {
  return (
    <>
      <Navbar setTheme={setTheme} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
