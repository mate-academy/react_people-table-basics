import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { Person, PersonWithParents } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();
      const peopleWithParents: PersonWithParents[]
        = peopleFromServer.map((child) => {
          const parent = peopleFromServer.find((person) => (
            person.name === child.fatherName
            || person.name === child.motherName
          ));
          const childWithParents: PersonWithParents = { ...child };

          if (parent && parent.sex === 'm') {
            childWithParents.father = parent;
          }

          if (parent && parent.sex === 'f') {
            childWithParents.mother = parent;
          }

          return childWithParents;
        });

      setPeople(peopleWithParents);
    } catch {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [isError]);

  return (
    <section className="people-page">
      <h2 className="people-page__title">
        People page
      </h2>
      {(!isError && !isLoading) && <PeopleTable people={people} />}
      {isLoading && 'Loading...'}
      {isError && 'Can\'t load data from server'}
    </section>
  );
};
