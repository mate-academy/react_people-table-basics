import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find(human => (
    human.name === person.motherName
  ));

  const father = people.find(human => (
    human.name === person.fatherName
  ));

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': (person.slug === slug),
      })}
    >
      <td>
        <a
          className={classNames({
            'has-text-danger': (person.sex === 'f'),
          })}
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {!person.motherName && (
          <p>-</p>
        )}

        {person.motherName && (
          mother ? (
            <a
              className="has-text-danger"
              href={`#/people/${mother.slug}`}
            >
              {person.motherName}
            </a>
          ) : (
            <p>
              {person.motherName}
            </p>
          )
        )}
      </td>

      <td>
        {!person.fatherName && (
          <p>-</p>
        )}

        {person.fatherName && (
          father ? (
            <a
              href={`#/people/${father.slug}`}
            >
              {person.fatherName}
            </a>
          ) : (
            <p>
              {person.fatherName}
            </p>
          )
        )}
      </td>
    </tr>
  );
};
