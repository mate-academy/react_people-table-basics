import { useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { LinkPerson } from './LinkPerson';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
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
          const { slug, born, died, sex, fatherName, motherName } = person;
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <LinkPerson person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <LinkPerson person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <LinkPerson person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
