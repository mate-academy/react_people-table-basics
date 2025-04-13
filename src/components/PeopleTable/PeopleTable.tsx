import React, { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { getPeople } from '../../api';

interface PeopleTableProps {
  selectedSlug?: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  selectedSlug: selectedSlug,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const prepareParentPerson = (
    parentName: string | null,
    sex: string,
  ): Person | null => {
    if (!parentName) {
      return null;
    }

    return {
      name: parentName,
      sex,
      born: 0,
      died: 0,
      fatherName: null,
      motherName: null,
      slug: '',
    };
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !error && people.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                const mother = prepareParentPerson(person.motherName, 'f');
                const father = prepareParentPerson(person.fatherName, 'm');
                const isSelected = person.slug === selectedSlug;

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={isSelected ? 'has-background-warning' : ''}
                  >
                    <td>
                      <PersonLink person={person} people={people} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink person={mother} people={people} />
                    </td>
                    <td>
                      <PersonLink person={father} people={people} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
