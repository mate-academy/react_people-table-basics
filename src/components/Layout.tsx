import React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
};
export const Layout: React.FC<Props> = ({
  title,
  children,
}) => {
  return (
    <div className="container">
      <h1 className="title">{title }</h1>
      {/* <h1 className="title">Home Page</h1>
      <h1 className="title">People Page</h1>
      <h1 className="title">Page not found</h1> */}
      {children}
    </div>
  );
};
