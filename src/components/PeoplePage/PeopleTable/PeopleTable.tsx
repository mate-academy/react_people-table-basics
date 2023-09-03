import React, { useEffect } from 'react';

import classNames from 'classnames';

import { useParams } from 'react-router-dom';
import { PeopleLink } from '../PeopleLink/PeopleLink';

import { Person } from '../../../types';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function getFindPerson(name: string) {
    return people.find(currentPerson => currentPerson.name === name);
  }

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [slug]);

  const getParent = (
    parent: Person | undefined, personParent: string,
  ) => {
    return parent
      ? <PeopleLink person={parent} />
      : personParent;
  };

  return (
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
          const mother = person.motherName
            ? getFindPerson(person.motherName)
            : undefined;
          const father = person.fatherName
            ? getFindPerson(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? getParent(mother, person.motherName) : '-'}
              </td>

              <td>
                {person.fatherName ? getParent(father, person.fatherName) : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
