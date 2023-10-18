import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import '../../App.scss';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const selectedPerson = slug;

  const peopleWithParents = people.map(person => {
    if (person.motherName && person.fatherName) {
      const mother = people.find(woman => woman.name === person.motherName);
      const father = people.find(man => man.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    }

    if (person.motherName) {
      const mother = people.find(woman => woman.name === person.motherName);

      return {
        ...person,
        mother,
      };
    }

    if (person.fatherName) {
      const father = people.find(man => man.name === person.fatherName);

      return {
        ...person,
        father,
      };
    }

    return person;
  });

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
        {peopleWithParents.map((person: Person) => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {!person.motherName && '-'}
              {person.motherName
                && (
                  person.mother
                    ? (
                      <PersonLink
                        person={person.mother}
                      />
                    )
                    : person.motherName
                )}
            </td>
            <td>
              {!person.fatherName && '-'}
              {person.fatherName
                && (
                  person.father
                    ? (
                      <PersonLink
                        person={person.father}
                      />
                    )
                    : person.fatherName
                )}
            </td>
          </tr>
        ))}
      </tbody>

    </table>

  );
};
