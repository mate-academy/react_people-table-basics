import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[] | null,
};

export const PeopleTable: FC <Props> = ({ people }) => {
  const { personData = '' } = useParams();

  const isExistPerson = (parent: string | null) => {
    if (parent) {
      return (people?.some(human => human.name === parent));
    }

    return false;
  };

  const getParentSlug = (parentName: string | null) => {
    const parent = people?.find(human => human.name === parentName);

    return parent?.slug;
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
        {people?.map(person => (
          <PersonLink
            key={person.name}
            to={person.slug}
            person={person}
            isExistPerson={isExistPerson}
            selectedPerson={personData}
            getParentSlug={getParentSlug}
          />
        ))}

      </tbody>
    </table>
  );
};
