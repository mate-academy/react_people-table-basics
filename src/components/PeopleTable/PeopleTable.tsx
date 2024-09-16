/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

  const preparedPeople = useMemo(() => {
    return people.map(person => {
      const father = people.find(human => human.name === person.fatherName)
        || null;

      const mother = people.find(human => human.name === person.motherName)
        || null;

      return { ...person, father, mother };
    });
  }, [people]);

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
        {preparedPeople.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
          father,
          mother,
          slug,
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': selectedSlug === slug,
            })}
          >
            <td>
              <PersonLink
                name={name}
                sex={sex}
                slug={slug}
              />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? (
                <PersonLink
                  name={mother.name}
                  sex="f"
                  slug={mother.slug}
                />
              ) : motherName || '-'}
            </td>
            <td>
              {father ? (
                <PersonLink
                  name={father.name}
                  sex="m"
                  slug={father.slug}
                />
              ) : fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
