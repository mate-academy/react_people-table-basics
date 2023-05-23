import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { Loader } from './Loader';

interface Props {
  people: Person[];
  isLoadingError: boolean
}

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoadingError,
}) => {
  const { slug = '' } = useParams();
  const findParent = (parentName: string) => {
    return people.find(person => person.name === parentName);
  };

  return (
    <>
      {!isLoadingError && people.length < 1
        ? (<Loader />) : (
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
              {people.map(person => (
                <PersonItem
                  person={person}
                  key={person.slug}
                  findParent={findParent}
                  selectedPerson={slug}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
