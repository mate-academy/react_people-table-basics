import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleInfo } from './PeopleInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Sex
          </th>
          <th>
            Born
          </th>
          <th>
            Died
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PeopleInfo
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
