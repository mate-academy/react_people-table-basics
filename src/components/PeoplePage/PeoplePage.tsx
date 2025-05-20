import { Person } from '../../types';
import { ShowPeoples } from '../ShowPeoples';
import React, { useEffect, useState } from 'react';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[] | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const time = setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        })
        .then(response => {
          setPeoples(response);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setShowLoader(false);
        });
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <ShowPeoples
            peoples={peoples}
            error={error}
            showLoader={showLoader}
          />
        </div>
      </div>
    </div>
  );
};
