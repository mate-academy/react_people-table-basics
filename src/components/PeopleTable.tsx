import cn from 'classnames';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TablePersonParents } from './TablePersonParents';

type Props = {
  peopleFromServer: Person[];
};

const tableHeads: string[] = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const { personSlug = '' } = useParams();

  const findParent = useCallback((motherName: string) => {
    const parent = peopleFromServer?.find(person => person.name === motherName);

    if (!parent) {
      return null;
    }

    return parent;
  }, [peopleFromServer]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeads.map(head => <th key={head}>{head}</th>)}
        </tr>
      </thead>

      <tbody>
        {peopleFromServer?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <TablePersonParents
              person={person}
              findParent={findParent}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
