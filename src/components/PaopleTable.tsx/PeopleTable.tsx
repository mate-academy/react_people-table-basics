import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[],
};

/* eslint-disable no-nested-ternary */
export const PeopleTable = ({ people }:Props) => {
  const { pathname } = useLocation<{ pathname: string }>();
  const [slugUser, setSlugUser] = useState(pathname.slice(8));

  const history = useHistory();

  useEffect(() => {
    if (!slugUser) {
      history.push('/people');
    }

    history.push(`/people/${slugUser}`);
  }, [slugUser]);

  const handleSlugUser = (value: string) => {
    setSlugUser(value);
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
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            people={people}
            handleSlugUser={handleSlugUser}
            slugUser={slugUser}
          />
        ))}
      </tbody>
    </table>
  );
};
