import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = people.find(parent => parent.name === motherName);
          const father = people.find(parent => parent.name === fatherName);

          const mum = mother && people.includes(mother)
            ? (
              <PersonLink
                name={motherName}
                sex={mother.sex}
                slug={mother.slug}
              />
            )
            : motherName;

          const dad = father && people.includes(father)
            ? (
              <PersonLink
                name={fatherName}
                sex={father.sex}
                slug={father.slug}
              />
            )
            : fatherName;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={person.slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherName
                  ? mum
                  : '-'}
              </td>

              <td>
                {fatherName
                  ? dad
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
