import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

type Props = {
  people: Person[];
  isError: boolean;
  loading: boolean;
};

export const PeoplePage: React.FC<Props> = ({ people, isError, loading }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPersonSlugSliceStartIndex = location.pathname.lastIndexOf('/')
    + 1;
    const currentPersonSlug = location.pathname.slice(
      currentPersonSlugSliceStartIndex,
    );

    setSelectedPerson((prevState) => {
      const newPerson = people.find(({ slug }) => slug === currentPersonSlug);

      if (!newPerson) {
        return prevState;
      }

      return newPerson;
    });
  }, [location, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      {!!people.length && (
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
            {people.map((person) => {
              const father = people.find(
                (per) => person.fatherName === per.name,
              );
              const mother = people.find(
                (per) => person.motherName === per.name,
              );

              const peopleNameLink = (
                per: Person | undefined,
                text?: string,
              ) => {
                return per ? <PersonLink person={per} /> : <span>{text}</span>;
              };

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={cn({
                    'has-background-warning':
                      selectedPerson?.slug === person.slug,
                  })}
                >
                  <td>{peopleNameLink(person, person.name)}</td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName
                      ? peopleNameLink(mother, person.motherName)
                      : '-'}
                  </td>
                  <td>
                    {person.fatherName
                      ? peopleNameLink(father, person.fatherName)
                      : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
