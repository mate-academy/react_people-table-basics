import { Person } from '../../types';
import React, { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [isValidSlug, setIsValidSlug] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!!slug && !people.find(p => p.slug === slug)) {
      setIsValidSlug(false);
      timer = setTimeout(() => {
        setIsValidSlug(true);
        navigator(-1);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [slug]);

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
        {isValidSlug ? (
          people.map(person => (
            <PersonLink person={person} key={person.slug} activeSlug={slug} />
          ))
        ) : (
          <tr>
            <td>No such person</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
