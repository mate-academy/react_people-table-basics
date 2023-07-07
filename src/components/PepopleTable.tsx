import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TablePersonParents } from './TablePersonParents';

type Props = {
  peopleFromServer: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const { personSlug = '' } = useParams();

  const findParent = useCallback((parentName: string) => {
    const parent = peopleFromServer?.find(person => person.name === parentName);

    if (!parent) {
      throw new Error('Cant find parent');
    }

    return parent;
  }, [peopleFromServer]);

  const personNames = useMemo(() => (
    peopleFromServer?.map(person => person.name)
  ), [peopleFromServer]);

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
              personNames={personNames}
              findParent={findParent}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
