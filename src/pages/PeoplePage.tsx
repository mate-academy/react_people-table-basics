import React from 'react';
import { usePeopleData } from '../CustomHooks/usePeopleData';

export const PeoplePage: React.FC = () => {
  const { content } = usePeopleData();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">{content}</div>
      </div>
    </>
  );
};
