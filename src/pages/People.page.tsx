import React from 'react';
import PersonWidget from '../components/PersonWidget';

const PeoplePage:React.FC = () => {
  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          <PersonWidget />

        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
