import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  const personWithParents = (person: Person) => {
    const mother = people.find(
      parent => parent.name === person.motherName,
    );

    const father = people.find(
      parent => parent.name === person.fatherName,
    );

    return ({ ...person, mother, father });
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
          <PersonLink
            person={personWithParents(person)}
            key={person.slug}
            selectedPerson={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
