import classNames from 'classnames';
import { Person } from '../../types';
import {
  useState,
  useCallback
} from 'react';
import { PersonLink } from '../../components/Person/PersonLink';
import { useParams } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [selectPerson, setSelectPerson] = useState<string | null>(slug || null);

  const findPersonByName = useCallback(
    (name: string | undefined | null): Person | null =>
      name
        ? people.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
        : null,
    [people]
  );

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
        {people.map(person => {
          const mother = person.motherName ? findPersonByName(person.motherName) : null;
          const father = person.fatherName ? findPersonByName(person.fatherName) : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectPerson,
              })}
              onClick={() => setSelectPerson(person.slug)}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
