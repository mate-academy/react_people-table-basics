import React, { useState, useEffect } from 'react';
import { PeopleTable } from './PeopleTable';
import {fetchPeople} from './api'

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);

  useEffect(()=>{
    fetchPeople().then(setPeople);    
  }, [])

  return (
    <div>
      <h1 className="display-3">People table</h1>
      <PeopleTable people={people}/>
    </div>
  );
};
