import classNames from 'classnames';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findMother = (person: Person) => {
    let mother: Person | null = null;

    if (person.motherName) {
      mother = people.find(p => p.name === person.motherName) || null;
    }

    return mother;
  };

  const findFather = (person: Person) => {
    let father: Person | null = null;

    if (person.fatherName) {
      father = people.find(p => p.name === person.fatherName) || null;
    }

    return father;
  };

  const newPeopleList = people.map(person => ({
    ...person,
    mother: findMother(person),
    father: findFather(person),
  }));

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
        {newPeopleList.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </a>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <a
                  href={`#/people/${person.mother.slug}`}
                  className={classNames({
                    'has-text-danger': person.mother.sex === 'f',
                  })}
                >
                  {person.mother.name}
                </a>
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <a
                  href={`#/people/${person.father.slug}`}
                  className={classNames({
                    'has-text-danger': person.father.sex === 'f',
                  })}
                >
                  {person.father.name}
                </a>
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
