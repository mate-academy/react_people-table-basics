import React from 'react';

type Props = {
  title: string;
};

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="title">{ title }</h1>
  );
};
