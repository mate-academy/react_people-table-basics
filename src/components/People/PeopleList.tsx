import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { findMother, findFather } from '../../Utils';
import { Person } from '../../types/Person';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

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
        {people?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn(
              { 'has-background-warning': person.slug === personSlug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {findMother(people, person.motherName)
                ? (
                  <PersonLink person={findMother(
                    people, person.motherName,
                  )}
                  />
                )
                : (
                  person.motherName
                )
                || '-'}
            </td>
            <td>
              {findFather(people, person.fatherName)
                ? (
                  <PersonLink person={findFather(
                    people,
                    person.fatherName,
                  )}
                  />
                )
                : (
                  person.fatherName
                )
                || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
