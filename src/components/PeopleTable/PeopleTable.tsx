import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  isLoading: boolean,
  selectPeopleSlug: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  people, isLoading, selectPeopleSlug,
}) => {
  const findParrent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName || '-';
  };

  const isSelected = (person: Person) => person.slug === selectPeopleSlug;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (<Loader />)
          : (
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
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': isSelected(person),
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{findParrent(person.motherName)}</td>
                    <td>{findParrent(person.fatherName)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
