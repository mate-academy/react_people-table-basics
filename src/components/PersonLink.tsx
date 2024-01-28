import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();

  const selectedPersonSlug = personSlug || '';

  const mother = people.find(body => body.name === person.motherName);
  const father = people.find(body => body.name === person.fatherName);

  if (selectedPersonSlug.length) {
    const motherSlug = selectedPersonSlug.slice(-(mother?.slug.length || 0));
    const fatherSlug = selectedPersonSlug.slice(-(father?.slug.length || 0));
    const bodySlug = selectedPersonSlug.slice(-(person?.slug.length || 0));

    if ((mother?.slug
      && selectedPersonSlug.includes(mother?.slug)
      && motherSlug !== mother?.slug)
      || (father?.slug
        && selectedPersonSlug.includes(father?.slug)
        && fatherSlug !== father?.slug)
      || (person.slug
        && selectedPersonSlug.includes(person.slug)
        && bodySlug !== person.slug)
    ) {
      return <Navigate to="*" />;
    }
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPersonSlug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {mother ? (
        <td>
          <Link
            to={`../${mother.slug}`}
            className={classNames({ 'has-text-danger': mother.sex === 'f' })}
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName ? person.motherName : '-'}</td>
      )}

      {father ? (
        <td>
          <Link
            to={`../${father.slug}`}
          >
            {person.fatherName}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName ? person.fatherName : '-'}</td>
      )}
    </tr>
  );
};
