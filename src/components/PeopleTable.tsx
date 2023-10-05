import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedPersonRef = useRef<HTMLTableRowElement | null>(null);

  function getPersonByName(name: string) {
    return people.find((person) => person.name === name);
  }

  useEffect(() => {
    const selectedPerson = people.find((person) => person.slug === slug);

    if (selectedPersonRef.current && selectedPerson) {
      selectedPersonRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, people]);

  return (
    <>
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
          {people.map((person) => {
            const {
              motherName,
              fatherName,
              sex,
              born,
              died,
            } = person;
            const mother = motherName ? getPersonByName(motherName) : undefined;
            const father = fatherName ? getPersonByName(fatherName) : undefined;

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
                ref={(ref) => {
                  if (person.slug === slug) {
                    selectedPersonRef.current = ref;
                  }
                }}
              >
                <td>
                  <PeopleLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {(motherName
                    && (mother ? <PeopleLink person={mother} /> : motherName))
                    || '-'}
                </td>
                <td>
                  {(fatherName
                    && (father ? <PeopleLink person={father} /> : fatherName))
                    || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
