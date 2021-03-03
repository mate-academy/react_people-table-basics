import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            People Table
          </h1>
        </div>
      </section>
      <PeopleTable people={people} />
    </>
  );
};
