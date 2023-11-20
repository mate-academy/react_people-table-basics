import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';

type Props = {
  people: Person[];
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
        {people.map(person => {
          const mother = people.find(mom => mom.name === person.motherName);
          const father = people.find(dad => dad.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': personSlug === person.slug,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{`${person.sex}`}</td>
              <td>{`${person.born}`}</td>
              <td>{`${person.died}`}</td>
              <td>
                {
                  mother
                    ? <PeopleLink person={mother} />
                    : person.motherName || '-'
                }

              </td>
              <td>
                {
                  father
                    ? <PeopleLink person={father} />
                    : person.fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
