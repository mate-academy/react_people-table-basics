/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = React.memo((
  { person, people },
) => {
  const {
    slug,
    sex,
    name,
  } = person;

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const myRef = useRef<HTMLAnchorElement>(null);

  const scrollDist = () => {
    if (selectedPerson && myRef.current) {
      const index = people.indexOf(selectedPerson);

      return index * myRef.current.offsetHeight;
    }

    return 0;
  };

  return (
    <Link
      to={`/people/${slug}`}
      ref={myRef}
      className={classNames(
        {
          'has-text-danger': sex === 'f',
        },
      )}
      onClick={() => {
        if (person) {
          setSelectedPerson(person);
        }

        window.scrollTo({
          top: scrollDist(),
          left: 0,
          behavior: 'smooth',
        });
      }}
    >
      {name}
    </Link>
  );
});
