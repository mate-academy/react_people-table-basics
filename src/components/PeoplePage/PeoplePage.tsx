import React, { useEffect, useState } from 'react';
import './PeoplePage.scss';

import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { ModalError } from '../ModalError/ModalError';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeopleError, setIsLoadingPeopleError] = useState(false);

  useEffect(() => {
    const response = async () => {
      try {
        const result = await getPeople();

        setPeople(result);
      } catch {
        setIsLoadingPeopleError(true);
      }
    };

    response();
  }, []);

  return (
    <div className="people-page">
      <h1 className="people-page__title">
        People page
      </h1>

      <PeopleTable
        people={people}
      />

      <ModalError
        isLoadingPeopleError={isLoadingPeopleError}
      />
    </div>
  );
};
