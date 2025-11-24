import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../UI/PersonLink';
import cn from 'classnames';
import { useMemo } from 'react';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const personNameInList = useMemo(() => {
    return new Map(people.map(person => [person.name, person]));
  }, [people]);

  const nameCheker = (name: string) => {
    const hasNameInMap = personNameInList.get(name);

    if (!hasNameInMap) {
      return name;
    }

    return <PersonLink person={hasNameInMap} />;
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
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{person.motherName ? nameCheker(person.motherName) : '-'}</td>
            <td>{person.fatherName ? nameCheker(person.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
