import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleList: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            people={people}
            person={person}
            slug={slug || null}
          />
        ))}
      </tbody>
    </table>
  );
};
