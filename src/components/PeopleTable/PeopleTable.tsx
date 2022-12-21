import classNames from 'classnames';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { PersonLink } from '../PersonLink';

import { Person } from '../../types/Person';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const myRef = useRef<HTMLTableRowElement>(null);

  const handleScroll = (ref: HTMLTableRowElement) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink
          person={parent}
          handleScroll={handleScroll}
          myRef={myRef}
        />
      );
    }

    return parentName || '-';
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
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              ref={myRef}
              className={classNames(
                {
                  'has-background-warning': slug === person.slug,
                },
              )}
            >
              <td>
                <PersonLink
                  person={person}
                  handleScroll={handleScroll}
                  myRef={myRef}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
