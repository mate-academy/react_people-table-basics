import classNames from 'classnames';
import { ReactElement } from 'react';

import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  people?: Person[] | null;
};

export const PeopleTable = ({ people }: PeopleTableProps): ReactElement => {
  const { slug } = useParams();

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
        {people?.map((person) => (
          <tr
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            data-cy="person"
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={person.mother}
                personParent={person.motherName}
              />
            </td>
            <td>
              <PersonLink
                person={person.father}
                personParent={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
