import cn from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Personlink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function getPersonByName(name: string) {
    return people.find(pers => pers.name === name);
  }

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        {people.map(person => {
          const mother = person.motherName
            ? getPersonByName(person.motherName)
            : undefined;
          const father = person.fatherName
            ? getPersonByName(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Personlink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <>
                    {mother ? (
                      <Personlink
                        person={mother}
                      />
                    ) : (
                      <>
                        {person.motherName}
                      </>
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <>
                    {father ? (
                      <Personlink
                        person={father}
                      />
                    ) : (
                      <>
                        {person.fatherName}
                      </>
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
