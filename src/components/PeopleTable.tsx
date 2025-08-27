import React, { useMemo } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {errorMessage !== '' && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {isLoading ? (
          <Loader />
        ) : (
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
                <th>Age</th>
                <th>Century</th>
              </tr>
            </thead>

            <tbody>
              <PeopleRows people={people} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

type RowsProps = { people: Person[] };

const PeopleRows: React.FC<RowsProps> = ({ people }) => {
  const { slug } = useParams();

  const nameToPerson = useMemo(() => {
    const map = new Map<string, Person>();

    people.forEach(p => {
      map.set(p.name, p);
    });

    return map;
  }, [people]);

  const getAge = (p: Person) => p.died - p.born;
  const getCentury = (p: Person) => Math.ceil(p.died / 100);

  return (
    <>
      {people.map(person => {
        const isSelected = slug === person.slug;

        const motherName = person.motherName || '';
        const fatherName = person.fatherName || '';

        const mother = motherName ? nameToPerson.get(motherName) : undefined;
        const father = fatherName ? nameToPerson.get(fatherName) : undefined;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={isSelected ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {motherName ? (
                mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <span className="has-text-danger">{motherName}</span>
                )
              ) : (
                <span>-</span>
              )}
            </td>
            <td>
              {fatherName ? (
                father ? (
                  <PersonLink person={father} />
                ) : (
                  <span>{fatherName}</span>
                )
              ) : (
                <span>-</span>
              )}
            </td>
            <td>{getAge(person)}</td>
            <td>{getCentury(person)}</td>
          </tr>
        );
      })}
    </>
  );
};
