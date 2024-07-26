import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const selectedPerson = people.find(p => p.slug === slug);

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
          // eslint-disable-next-line
          const { slug, sex, born, died, fatherName, motherName } = person;

          const motherPerson = people.find(p => p.name === motherName);
          const fatherPerson = people.find(p => p.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson?.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  <span>{motherName || '-'}</span>
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  <span>{fatherName ? fatherName : '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
