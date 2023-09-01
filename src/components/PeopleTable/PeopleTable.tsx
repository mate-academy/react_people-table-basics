import cn from 'classnames';
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
                  {getPersonByName(person.motherName)
                    ? (
                      <Personlink
                        person={getPersonByName(person.motherName) as Person}
                      />
                    )
                    : (
                      <>
                        {person.motherName}
                      </>
                    )}
                </>
              )
                : (
                  '-'
                )}
            </td>
            <td>
              {person.fatherName
                ? (
                  <>
                    {getPersonByName(person.fatherName)
                      ? (
                        <Personlink
                          person={getPersonByName(person.fatherName) as Person}
                        />
                      )
                      : (
                        <>
                          {person.fatherName}
                        </>
                      )}
                  </>
                )
                : (
                  '-'
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
